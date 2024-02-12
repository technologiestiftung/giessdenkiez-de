import localizedContent from '../../assets/content';
import { Language } from '../../assets/content-types';
import { I18N_KEY } from '../../assets/local-storage';

const useLocalizedPumpState = (state: string): string => {
  const language = localStorage.getItem(I18N_KEY);
  if (language == 'de') return state;
  const contentDe = localizedContent[Language.de];
  const contentEn = localizedContent[Language.en];
  const found = Object.entries(contentDe.legend.pumpState).filter(
    entry => entry[1] === state
  )[0];
  return contentEn.legend.pumpState[found[0]];
};

export default useLocalizedPumpState;
