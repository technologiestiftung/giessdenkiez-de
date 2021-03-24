import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
`;
