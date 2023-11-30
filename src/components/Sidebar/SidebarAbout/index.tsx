import React, { FC } from 'react';

import SidebarTitle from '../SidebarTitle/';
import SocialSharing from '../../SocialSharing';
import OpenSourceNote from '../../OpenSource';
import content from '../../../assets/content';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';
import { SlackButton } from '../../SlackButton';
import Credits from '../../Credits';

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
            <div>
              <br />
              <SlackButton />
            </div>
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
      <br />
      <OpenSourceNote />
      <SocialSharing />
      <hr style={{ marginBottom: '2rem', opacity: 0.1 }} />
      <Credits />
    </>
  );
};

export default SidebarAbout;
