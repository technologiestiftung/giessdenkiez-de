import localizedContent from '../../assets/content';
import { Content } from '../../assets/content-types';
import { useStoreState } from '../../state/unistore-hooks';

const useLocalizedContent = (): Content => {
  const language = useStoreState('language');
  const returnContent = localizedContent[language];
  return returnContent;
};

export default useLocalizedContent;
