import React, { FC } from 'react';

import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';
import Credits from '../../Credits';
import ExpandablePanel from '../../ExpandablePanel';
import OpenSourceNote from '../../OpenSource';
import { SlackButton } from '../../SlackButton';
import SmallParagraph from '../../SmallParagraph';
import SocialSharing from '../../SocialSharing';
import SidebarTitle from '../SidebarTitle/';

const SidebarAbout: FC = () => {
  const content = useLocalizedContent();
  const { sidebar } = content;
  const { about, furtherInfo } = sidebar;
  return (
    <>
      <SidebarTitle>{furtherInfo}</SidebarTitle>
      {about.map((item, idx) => (
        <ExpandablePanel $isExpanded title={item.title} key={item.title}>
          <SmallParagraph>{item.description}</SmallParagraph>
          {idx === 0 && (
            <div>
              <br />
              <SlackButton />
            </div>
          )}
          {idx === 2 && <Credits></Credits>}
        </ExpandablePanel>
      ))}

      <SidebarTitle>{content.faq.title}</SidebarTitle>
      <SmallParagraph>{content.faq.description}</SmallParagraph>
      {content.faq.qa.map(item => (
        <ExpandablePanel key={item.question} title={item.question}>
          <SmallParagraph>{item.answer}</SmallParagraph>
        </ExpandablePanel>
      ))}
      <SocialSharing />
      <OpenSourceNote />
      <hr style={{ marginBottom: '2rem', opacity: 0.1 }} />
      <Credits />
    </>
  );
};

export default SidebarAbout;
