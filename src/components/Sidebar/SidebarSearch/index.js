import React from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';
import SidebarSearchAge from './SidebarSearchAge';

const SidebarAbout = p => {
  return (
    <>
      <SidebarTitle>Suche</SidebarTitle>
      <SidebarSearchAge/>
    </>
  )
}

export default SidebarAbout;