#!/usr/bin/env python3
"""
Lê um CSV de transferências recebidas (como o gerado por gettingDonations.py),
soma os valores e extrai os nomes presentes na coluna "Descrição" entre o
primeiro " - " e o segundo " - ".

Exemplo de descrição:
"Transferência recebida pelo Pix - CLAUDIO ROMERO PEREIRA DE ARAUJO - •••.605.043-•• - ..."

Saídas:
- Imprime no stdout o total somado.
- Gera um .txt com os nomes (por padrão, únicos e ordenados) no mesmo diretório do CSV.

Uso rápido:
    python summarizeDonations.py --input-file /home/dell/Downloads/NU-transferencias-recebidas-XXXX.csv

Opções:
    --names-output para alterar o caminho do .txt
    --unique/--no-unique para controlar deduplicação
    --case-mode title|simple para padronizar o nome
        - title: Capitaliza palavras, com minúsculas para artigos/conjunções comuns (padrão)
        - simple: Apenas primeira letra do nome toda e o resto minúsculo
"""

from __future__ import annotations

import argparse
import csv
import os
import re
import sys
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP, getcontext
from typing import List, Optional, Sequence, Tuple


# Precisão adequada para dinheiro em reais
getcontext().prec = 28
getcontext().rounding = ROUND_HALF_UP


def try_open_text(path: str):
    encodings = ["utf-8-sig", "utf-8", "latin-1"]
    last_exc: Optional[Exception] = None
    for enc in encodings:
        try:
            return open(path, "r", encoding=enc, newline="")
        except Exception as exc:
            last_exc = exc
    if last_exc:
        raise last_exc
    raise RuntimeError(f"Falha ao abrir arquivo: {path}")


def sniff_dialect(sample_text: str) -> type[csv.Dialect]:
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


def normalize_text(s: str) -> str:
    return (s or "").strip()


def detect_value_column(fieldnames: Sequence[str]) -> Optional[str]:
    if not fieldnames:
        return None
    # Preferências comuns em exports do Nubank
    candidates = [
        "valor",
        "valor (r$)",
        "valor r$",
        "amount",
    ]
    lower_map = {fn: (fn or "").strip().lower() for fn in fieldnames}
    for pref in candidates:
        for original, lower in lower_map.items():
            if lower == pref:
                return original
    # fallback: qualquer coluna que contenha 'valor'
    for original, lower in lower_map.items():
        if "valor" in lower:
            return original
    return None


def parse_brl_decimal(s: str) -> Decimal:
    if s is None:
        return Decimal("0")
    text = s.strip()
    if not text:
        return Decimal("0")
    # Remove R$, espaços e separadores de milhar
    text = re.sub(r"[Rr]\$\s*", "", text)
    text = text.replace(".", "")  # milhar pt-BR
    text = text.replace(",", ".")  # vírgula decimal -> ponto
    try:
        return Decimal(text)
    except InvalidOperation:
        # Tenta última chance com regex extraindo número
        m = re.search(r"-?\d+[\d.]*,?\d*", s)
        if m:
            txt = m.group(0).replace(".", "").replace(",", ".")
            try:
                return Decimal(txt)
            except InvalidOperation:
                pass
        return Decimal("0")


NAME_BETWEEN_DASHES = re.compile(r"\s-\s([^\-]+?)\s-\s")


def extract_name_from_description(desc: str) -> Optional[str]:
    if not desc:
        return None
    # Primeiro, tentar padrão comum " - NOME - " (com espaços)
    m = NAME_BETWEEN_DASHES.search(desc)
    if m:
        return m.group(1).strip()
    # Fallback: tentar com hífens sem espaços (menos comum)
    m2 = re.search(r"-([^\-]+?)-", desc)
    if m2:
        return m2.group(1).strip()
    return None


LOWER_WORDS = {"da", "de", "do", "das", "dos", "e", "di", "du", "d'"}


def titlecase_name(name: str) -> str:
    parts = re.split(r"(\s+)", name.strip().lower())
    out: List[str] = []
    for p in parts:
        if p.isspace():
            out.append(p)
            continue
        if p in LOWER_WORDS:
            out.append(p)
        else:
            out.append(p[:1].upper() + p[1:])
    return "".join(out)


def simple_case(name: str) -> str:
    n = name.strip()
    return (n[:1].upper() + n[1:].lower()) if n else n


def run(input_file: str, names_output: Optional[str], unique: bool, case_mode: str) -> Tuple[Decimal, str, int]:
    # Ler amostra para sniff
    with open(input_file, "rb") as fb:
        sample = fb.read(4096)
    dialect = sniff_dialect(sample.decode("utf-8", errors="ignore"))

    with try_open_text(input_file) as f:
        reader = csv.DictReader(f, dialect=dialect)
        headers = list(reader.fieldnames or [])
        value_key = detect_value_column(headers)
        if not value_key:
            raise RuntimeError("Não foi possível detectar a coluna de valores (ex.: 'Valor').")
        if "Descrição" not in headers and not any(h.lower() == "descrição" or "descr" in (h.lower()) for h in headers):
            raise RuntimeError("Coluna 'Descrição' não encontrada.")

        total = Decimal("0")
        names: List[str] = []

        for row in reader:
            total += parse_brl_decimal(row.get(value_key, ""))
            raw_desc = row.get("Descrição") or next((row[h] for h in headers if h and "descr" in h.lower()), "")
            name = extract_name_from_description(raw_desc)
            if name:
                if case_mode == "simple":
                    name_std = simple_case(name)
                else:
                    name_std = titlecase_name(name)
                names.append(name_std)

    # Preparar saída de nomes
    if names_output is None:
        base_dir = os.path.dirname(os.path.abspath(input_file))
        names_output = os.path.join(base_dir, "NU-transferencias-recebidas-nomes.txt")

    os.makedirs(os.path.dirname(names_output), exist_ok=True)
    if unique:
        dedup_sorted = sorted(set(n for n in names if n))
        to_write = dedup_sorted
    else:
        to_write = [n for n in names if n]

    with open(names_output, "w", encoding="utf-8") as out:
        for n in to_write:
            out.write(n + "\n")

    return total, names_output, len(to_write)


def parse_args(argv: Optional[Sequence[str]] = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Soma valores e extrai nomes de um CSV de transferências.")
    p.add_argument("--input-file", required=True, help="Caminho do CSV de entrada (agregado/filtrado)")
    p.add_argument("--names-output", default=None, help="Caminho do .txt com nomes (padrão: mesmo diretório do CSV)")
    p.add_argument("--unique", dest="unique", action="store_true", help="Escrever nomes únicos e ordenados (padrão)")
    p.add_argument("--no-unique", dest="unique", action="store_false", help="Permitir nomes repetidos (por linha)")
    p.set_defaults(unique=True)
    p.add_argument("--case-mode", choices=["title", "simple"], default="title", help="Padronização do nome")
    return p.parse_args(argv)


def main(argv: Optional[Sequence[str]] = None) -> int:
    args = parse_args(argv)
    try:
        total, out_path, count = run(
            input_file=args.input_file,
            names_output=args.names_output,
            unique=args.unique,
            case_mode=args.case_mode,
        )
        # Imprime total com formatação BRL simples
        total_brl = f"R$ {total:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
        print(f"Total somado: {total_brl}")
        print(f"Nomes gravados ({count}): {out_path}")
        return 0
    except Exception as e:
        print(f"Erro: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
