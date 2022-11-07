import React, { FC } from 'react';

import SidebarTitle from '../SidebarTitle/';
import SocialSharing from '../../SocialSharing';
import OpenSourceNote from '../../OpenSource';
import content from '../../../assets/content';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';
import { SlackButton } from '../../SlackButton';

const SidebarAbout: FC = () => {
  const { sidebar } = content;
  const { about } = sidebar;
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
      {content.faq.qa.map(item => (
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
