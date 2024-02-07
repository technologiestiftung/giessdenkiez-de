import { Content, LocalizedContent } from '../../assets/content-types';
import localizedContent from '../../assets/content';
import { useStoreState } from '../../state/unistore-hooks';

const useLocalizedContent = (
  overrideLanguage: string | undefined = undefined
): Content => {
  let language = overrideLanguage;
  if (!overrideLanguage) {
    language = useStoreState('language');
  }
  const returnContent = localizedContent[language!];
  return returnContent;
};

export default useLocalizedContent;
