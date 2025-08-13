// i18n.js - contexto simples de idioma PT/EN com persistência via localStorage e reload
import { createContext, useContext, useEffect, useState } from 'react';

const SUPPORTED = ['pt', 'en'];
const DEFAULT_LANG = 'pt';

const translations = {
  pt: {
    howHelp: 'Como Ajudar',
    finance: 'Financeiro',
    copyKey: 'Copiar chave',
    copied: 'Copiado!',
    share: 'Copiar link',
    pix: 'PIX',
    intlTransfer: 'Transferência internacional (Wise)',
    ted: 'TED',
    contactsShare: 'Contatos e Compartilhar',
    scanPix: 'Escaneie o QR Code ou copie a chave para doar via PIX.',
    useData: 'Use os dados abaixo para transferência direta para a conta internacional.',
    tedData: 'Dados para transferência nacional.',
    networks: 'Me encontre nas redes:',
    shareHelp: 'Se não puder contribuir agora, compartilhar já ajuda!',
    raised: 'Arrecadado',
    goal: 'Meta',
    updated: 'Atualizado'
  },
  en: {
    howHelp: 'How to Help',
    finance: 'Financials',
    copyKey: 'Copy key',
    copied: 'Copied!',
    share: 'Copy link',
    pix: 'PIX',
    intlTransfer: 'International transfer (Wise)',
    ted: 'Domestic transfer (TED)',
    contactsShare: 'Contacts & Share',
    scanPix: 'Scan the QR Code or copy the key to donate via PIX.',
    useData: 'Use the data below for a direct transfer to the international account.',
    tedData: 'Data for Brazilian domestic transfer.',
    networks: 'Find me on:',
    shareHelp: 'If you cannot donate now, sharing already helps!',
    raised: 'Raised',
    goal: 'Goal',
    updated: 'Updated'
  }
};

const I18nContext = createContext({ lang: DEFAULT_LANG, t: (k)=>k, setLang: ()=>{} });

export const I18nProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  });
  const setLang = (l) => {
    if (!SUPPORTED.includes(l)) return;
    localStorage.setItem('lang', l);
    setLangState(l);
    window.location.reload();
  };
  useEffect(()=>{ document.documentElement.lang = lang; },[lang]);
  const t = (key) => translations[lang]?.[key] ?? key;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
