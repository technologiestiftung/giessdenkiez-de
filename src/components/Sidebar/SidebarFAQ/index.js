import React from 'react';

import SidebarTitle from '../SidebarTitle/';
import SidebarMarkup from '../SidebarMarkup';

import content from '../../../assets/content';

const SidebarFAQ = p => {
  const { sidebar: { faq } } = content;
  return (
    <>
      <SidebarTitle>FAQs</SidebarTitle>
      {faq.map((item, i) => <SidebarMarkup item={item} key={i} />)}
    </>
  );
};

export default SidebarFAQ;
