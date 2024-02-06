import { Content, LocalizedContent } from '../../assets/content-types';
import content from '../../assets/content';
import { useStoreState } from '../../state/unistore-hooks';

const useLocalizedContent = (): Content => {
  const localizedContent = {
    de: content,
    en: content,
  } as LocalizedContent;

  const language = useStoreState('language');
  const returnContent = localizedContent[language];
  return returnContent;
};

export default useLocalizedContent;
