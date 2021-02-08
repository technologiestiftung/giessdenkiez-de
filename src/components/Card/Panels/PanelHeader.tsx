import styled from 'styled-components';

interface PanelHeaderProps {
  expanded?: boolean;
}
export const PanelHeader = styled.div<PanelHeaderProps>`
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  line-height: 1.3rem;
  padding-bottom: ${props => (props.expanded ? '1.3rem' : 'auto')};
  cursor: pointer;
`;
