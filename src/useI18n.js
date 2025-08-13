import { useContext } from 'react';
import { I18nContext } from './i18nContext.js';

export const useI18n = () => useContext(I18nContext);
