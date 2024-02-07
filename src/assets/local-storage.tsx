import { Language } from './content-types';

const I18N_KEY = 'i18n';

export function getLocalStorageLanguage(): Language {
  const foundLanguage = localStorage.getItem(I18N_KEY);

  if (foundLanguage && foundLanguage === 'de') {
    return Language.de;
  }

  return Language.en;
}

export function setLocalStorageLanguage(value: Language) {
  localStorage.setItem(I18N_KEY, value.toString());
}
