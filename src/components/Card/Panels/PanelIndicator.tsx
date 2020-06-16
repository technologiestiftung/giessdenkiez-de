import styled from 'styled-components';
export const PanelIndicator = styled.span`
  width: 28px;
  justify-content: center;
  height: 28px;
  align-items: center;
  display: flex;
  border-radius: 100px;
  opacity: 1;
  cursor: pointer;
  transition: all 0.125s ease-in-out;

  &:hover {
    opactiy: 0.5;
    transition: all 0.125s ease-in-out;
  }
`;
