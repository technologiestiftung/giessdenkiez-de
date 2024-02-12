import { Language } from './content-types';

export const I18N_KEY = 'i18n';

export function getLocalStorageLanguage(): Language {
  const foundLanguage = localStorage.getItem(I18N_KEY);

  if (foundLanguage && foundLanguage === 'en') {
    return Language.en;
  }

  return Language.de;
}

export function setLocalStorageLanguage(value: Language) {
  localStorage.setItem(I18N_KEY, value.toString());
}
