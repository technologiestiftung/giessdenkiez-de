import React from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';
import Login from "../../Login";

const SidebarProfile = p => {
  return (
    <>
      <SidebarTitle>Profil</SidebarTitle>
      <Login />
    </>
  )
}

export default SidebarProfile;