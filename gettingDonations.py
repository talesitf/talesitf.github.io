#!/usr/bin/env python3
"""
Agrega linhas de CSVs (prefixo "NU" em ~/Downloads) onde a coluna
"Descrição" contém "Transferência Recebida" e salva em um novo CSV.

Uso rápido (padrões adequados ao pedido):
	python gettingDonations.py

Opções:
	python gettingDonations.py \
		--input-dir /home/dell/Downloads \
		--prefix NU \
		--column Descrição \
		--contains "Transferência Recebida" \
		--output /home/dell/Downloads/NU-transferencias-recebidas.csv

O script é tolerante a acentos e maiúsculas/minúsculas na busca e tenta
detectar o delimitador e encoding automaticamente.
"""

from __future__ import annotations

import argparse
import csv
import glob
import os
import sys
import time
import unicodedata
from typing import Dict, Iterable, List, Optional, Sequence, Tuple


def normalize_text(s: str) -> str:
	"""Normaliza string para comparação: minúsculas, sem acentos, strip."""
	if s is None:
		return ""
	# NFC -> NFKD remove diacríticos
	s_norm = unicodedata.normalize("NFKD", s)
	s_no_accents = "".join(ch for ch in s_norm if not unicodedata.combining(ch))
	return s_no_accents.casefold().strip()


def sniff_dialect(sample_bytes: bytes) -> type[csv.Dialect]:
	"""Tenta deduzir o dialect (delimitador, quote, etc.).
	Retorna a classe Dialect (compatível com csv), com fallback para vírgula.
	"""
	sample_text = sample_bytes.decode("utf-8", errors="ignore")
	try:
		return csv.Sniffer().sniff(sample_text)
	except Exception:
		class _Default(csv.Dialect):
			delimiter = ","
			quotechar = '"'
			doublequote = True
			skipinitialspace = False
			lineterminator = "\n"
			quoting = csv.QUOTE_MINIMAL

		return _Default


def try_open_text(path: str):
	"""Abre arquivo de texto tentando encodings comuns (utf-8-sig, utf-8, latin-1)."""
	encodings = ["utf-8-sig", "utf-8", "latin-1"]
	last_exc: Optional[Exception] = None
	for enc in encodings:
		try:
			return open(path, "r", encoding=enc, newline="")
		except Exception as exc:  # pragma: no cover - só em runtime
			last_exc = exc
			continue
	# Se chegou aqui, reergue última exception
	if last_exc:
		raise last_exc
	raise RuntimeError(f"Falha ao abrir arquivo: {path}")


def find_description_key(fieldnames: Sequence[str]) -> Optional[str]:
	"""Retorna o nome exato da coluna 'Descrição' (variações toleradas)."""
	if not fieldnames:
		return None
	targets = {"descricao", "descrição"}
	normalized_map = {fn: normalize_text(fn) for fn in fieldnames}
	for original, norm in normalized_map.items():
		if norm in targets:
			return original
	# fallback: busca por coluna que contenha 'desc'
	for original, norm in normalized_map.items():
		if norm.startswith("desc"):
			return original
	return None


def resolve_column_key(fieldnames: Sequence[str], preferred: Optional[str]) -> Optional[str]:
	"""Resolve a coluna alvo, priorizando 'preferred' (tolerante a acentos/case).
	Se não encontrada, tenta detectar variações de 'Descrição'.
	"""
	if not fieldnames:
		return None
	if preferred:
		pref_norm = normalize_text(preferred)
		for original in fieldnames:
			if normalize_text(original) == pref_norm:
				return original
	# fallback para variantes conhecidas
	return find_description_key(fieldnames)


def read_matching_rows(csv_path: str, contains_text: str, column_preferred: Optional[str]) -> Tuple[List[str], List[Dict[str, str]]]:
	"""Lê um CSV e retorna (headers, rows_filtradas) por 'Descrição' contém texto.

	- Detecta dialect usando amostra do arquivo.
	- Usa DictReader para preservar nomes de colunas originais.
	- Filtro é case/acento-insensitive.
	"""
	contains_norm = normalize_text(contains_text)
	with open(csv_path, "rb") as fb:
		sample = fb.read(4096)
	dialect = sniff_dialect(sample)

	with try_open_text(csv_path) as f:
		reader = csv.DictReader(f, dialect=dialect)
		headers = list(reader.fieldnames or [])
		desc_key = resolve_column_key(headers, column_preferred)
		if not desc_key:
			return headers, []

		matched: List[Dict[str, str]] = []
		for row in reader:
			# Valor pode ser None se coluna ausente na linha ou vazia.
			val = row.get(desc_key) or ""
			if contains_norm in normalize_text(val):
				matched.append(row)
		return headers, matched


def merge_headers(all_headers: Iterable[Sequence[str]]) -> List[str]:
	"""Cria união ordenada dos headers, mantendo ordem de 1ª aparição."""
	seen = set()
	merged: List[str] = []
	for headers in all_headers:
		for h in headers:
			if h not in seen:
				seen.add(h)
				merged.append(h)
	return merged


def write_csv(path: str, headers: List[str], rows: Iterable[Dict[str, str]]) -> None:
	os.makedirs(os.path.dirname(path), exist_ok=True)
	with open(path, "w", encoding="utf-8-sig", newline="") as f:
		writer = csv.DictWriter(f, fieldnames=headers, extrasaction="ignore")
		writer.writeheader()
		for r in rows:
			# Garante que todas colunas existam
			out = {h: (r.get(h, "") if r.get(h) is not None else "") for h in headers}
			writer.writerow(out)


def find_input_files(input_dir: str, prefix: str) -> List[str]:
	pattern = os.path.join(os.path.abspath(input_dir), f"{prefix}*.csv")
	return sorted(glob.glob(pattern))


def build_default_output_path(input_dir: str) -> str:
	ts = time.strftime("%Y%m%d-%H%M%S")
	return os.path.join(os.path.abspath(input_dir), f"NU-transferencias-recebidas-{ts}.csv")


def run(
	input_dir: str,
	prefix: str,
	column: str,
	contains_text: str,
	output: Optional[str] = None,
) -> str:
	files = find_input_files(input_dir, prefix)
	if not files:
		print(f"Nenhum CSV encontrado com prefixo '{prefix}' em: {input_dir}")
		return ""

	all_headers: List[List[str]] = []
	all_rows: List[Dict[str, str]] = []
	skipped_no_desc: List[str] = []

	for path in files:
		headers, rows = read_matching_rows(path, contains_text, column)
		if not headers:
			print(f"Aviso: arquivo sem headers ou vazio: {path}")
		else:
			# Verifica presença da coluna desejada (tolerante via find_description_key)
			desc_key = resolve_column_key(headers, column)
			if not desc_key:
				skipped_no_desc.append(path)
			all_headers.append(headers)
		all_rows.extend(rows)

	if not all_rows:
		print("Nenhuma linha correspondente encontrada.")
		if skipped_no_desc:
			print("Arquivos ignorados por não conter coluna 'Descrição':")
			for p in skipped_no_desc:
				print(f"  - {p}")
		return ""

	merged_headers = merge_headers(all_headers)

	out_path = output or build_default_output_path(input_dir)
	write_csv(out_path, merged_headers, all_rows)

	print(
		f"OK: {len(all_rows)} linha(s) salvas em '{out_path}'. "
		f"Arquivos lidos: {len(files)}; ignorados sem 'Descrição': {len(skipped_no_desc)}"
	)
	return out_path


def parse_args(argv: Optional[Sequence[str]] = None) -> argparse.Namespace:
	parser = argparse.ArgumentParser(description="Filtra 'Transferência Recebida' em CSVs do Nubank.")
	parser.add_argument(
		"--input-dir",
		default=os.path.expanduser("~/Downloads"),
		help="Diretório de entrada (padrão: ~/Downloads)",
	)
	parser.add_argument(
		"--prefix",
		default="NU",
		help="Prefixo dos arquivos CSV (padrão: NU)",
	)
	parser.add_argument(
		"--column",
		default="Descrição",
		help="Nome da coluna a inspecionar (padrão: Descrição)",
	)
	parser.add_argument(
		"--contains",
		dest="contains_text",
		default="Transferência Recebida",
		help="Texto a procurar na coluna (padrão: 'Transferência Recebida')",
	)
	parser.add_argument(
		"--output",
		default=None,
		help="Caminho do CSV de saída (padrão: gera um com timestamp em input-dir)",
	)
	return parser.parse_args(argv)


def main(argv: Optional[Sequence[str]] = None) -> int:
	args = parse_args(argv)
	try:
		out_path = run(
			input_dir=args.input_dir,
			prefix=args.prefix,
			column=args.column,
			contains_text=args.contains_text,
			output=args.output,
		)
		return 0 if out_path else 1
	except Exception as e:  # pragma: no cover - log simples
		print(f"Erro: {e}")
		return 2


if __name__ == "__main__":
	sys.exit(main())

