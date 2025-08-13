import { useEffect, useState, useCallback, useMemo } from 'react';
import { I18nContext } from './i18nContext.js';

const SUPPORTED = ['pt', 'en'];
const DEFAULT_LANG = 'pt';

const loaders = {
  pt: () => import('./locales/pt.json'),
  en: () => import('./locales/en.json')
};

export const I18nProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  });
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const mod = await loaders[lang]();
        if (!cancelled) setMessages(mod.default || mod);
      } catch (e) {
        console.error('Erro carregando locale', lang, e);
        if (!cancelled) setMessages({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [lang]);

  const setLang = useCallback((l) => {
    if (!SUPPORTED.includes(l) || l === lang) return;
    localStorage.setItem('lang', l);
    setLangState(l);
  }, [lang]);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const t = useCallback((key, vars) => {
    let msg = messages[key] ?? key;
    if (vars && typeof vars === 'object') {
      for (const k of Object.keys(vars)) {
        const val = vars[k];
        // Suporta {chave} e {{chave}}
        msg = msg.replace(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), String(val));
        msg = msg.replace(new RegExp(`{${k}}`, 'g'), String(val));
      }
    }
    return msg;
  }, [messages]);

  const currencyFormatterEUR = useMemo(() => new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }), [lang]);
  const currencyFormatterBRL = useMemo(() => new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }), [lang]);
  const formatNumber = useCallback((n, opts) => new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', opts).format(n), [lang]);
  const formatCurrency = useCallback((v, currency='EUR') => {
    if (currency === 'BRL') return currencyFormatterBRL.format(v);
    if (currency === 'EUR') return currencyFormatterEUR.format(v);
    return new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency }).format(v);
  }, [lang, currencyFormatterBRL, currencyFormatterEUR]);
  const formatDate = useCallback((d, opts) => {
    const date = d instanceof Date ? d : new Date(d);
    return new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', opts || { dateStyle: 'medium' }).format(date);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t, isLoading: loading, formatNumber, formatCurrency, formatDate }), [lang, setLang, t, loading, formatNumber, formatCurrency, formatDate]);

  return (
    <I18nContext.Provider value={value}>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: 12, flexDirection: 'column', fontFamily: 'system-ui, sans-serif', color: '#94a3b8' }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', border: '4px solid #1e3a8a', borderTopColor: '#60a5fa', animation: 'spin 0.9s linear infinite' }} />
          <small style={{ letterSpacing: '.5px', fontSize: 12 }}>Loading…</small>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      ) : children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;
