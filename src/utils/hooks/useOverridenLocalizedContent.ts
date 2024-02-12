import localizedContent from '../../assets/content';
import { Content } from '../../assets/content-types';

const useLocalizedContent = (overrideLanguage: string): Content => {
  const returnContent = localizedContent[overrideLanguage];
  return returnContent;
};

export default useLocalizedContent;
