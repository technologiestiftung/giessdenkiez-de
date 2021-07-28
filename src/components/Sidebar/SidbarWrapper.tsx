import React, { FC } from 'react';
import styled from 'styled-components';
import SidebarClose from './SidebarClose';

interface SidebarWrapperType {
  isVisible?: boolean;
  title?: string;
  isLoading?: boolean;
}

type StyledSidebarWrapperType = Pick<SidebarWrapperType, 'isVisible'>;

const StyledSidebarWrapper = styled.div<StyledSidebarWrapperType>`
  z-index: 3;
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  top: 12px;
  left: 12px;
  bottom: 12px;
  transform: ${props =>
    props.isVisible
      ? 'translate3d(0, 0, 0)'
      : 'translate3d(calc(-100% - 20px), 0, 0)'};
  background: white;
  width: 340px;
  box-shadow: ${p => p.theme.boxShadow};
  transition: transform 0.5s, box-shadow 0.5s;

  @media screen and (max-width: ${p => p.theme.screens.mobile}) {
    width: calc(100vw - 24px);
  }
`;

const SidebarContent = styled.div`
  padding: 0px 15px 15px;
  width: 100%;
  min-height: 100%;
  position: relative;
  box-sizing: border-box;
`;

const SidebarWrapper: FC<SidebarWrapperType> = ({
  children,
  isVisible = true,
}) => (
  <StyledSidebarWrapper isVisible={isVisible}>
    <SidebarClose />
    <SidebarContent>{children}</SidebarContent>
  </StyledSidebarWrapper>
);

export default SidebarWrapper;
