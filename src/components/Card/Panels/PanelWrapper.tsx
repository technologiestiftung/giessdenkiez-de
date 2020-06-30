import styled from 'styled-components';
export const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100% !important;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding-bottom: 10px;
  animation: sweep 0.125s ease-in-out;
  margin-bottom: 10px;
`;
