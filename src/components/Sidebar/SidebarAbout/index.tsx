import React, { FC, useState, useEffect } from 'react';

import SidebarTitle from '../SidebarTitle/';
import SocialSharing from '../../SocialSharing';
import OpenSourceNote from '../../OpenSource';
import content from '../../../assets/content';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';
import { SlackButton } from '../../SlackButton';
import { useSessionContext } from '@supabase/auth-helpers-react';

const SidebarAbout: FC = () => {
  const { supabaseClient } = useSessionContext();
  const { sidebar } = content;
  const { about } = sidebar;
  const [faqs, setFaqs] = useState(null);
  const loadFaqs = async () => {
    try {
      const { data, error } = await supabaseClient.from('faqs').select('*');
      if (error) throw error;
      setFaqs(data);
      console.log(faqs);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadFaqs().catch(console.error);
  }, []);

  return (
    <>
      <SidebarTitle>Weitere Infos</SidebarTitle>
      {about.map((item, idx) => (
        <ExpandablePanel isExpanded title={item.title} key={item.title}>
          <SmallParagraph>{item.description}</SmallParagraph>
          {idx === 0 && (
            <>
              <br />
              <SlackButton />
            </>
          )}
        </ExpandablePanel>
      ))}

      <SidebarTitle>{content.faq.title}</SidebarTitle>
      <SmallParagraph>{content.faq.description}</SmallParagraph>
      {faqs &&
        faqs.map(item => (
          <ExpandablePanel key={item.question} title={item.question}>
            <SmallParagraph>{item.answer}</SmallParagraph>
          </ExpandablePanel>
        ))}
      <SocialSharing />
      <OpenSourceNote />
    </>
  );
};

export default SidebarAbout;
