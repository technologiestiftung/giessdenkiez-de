import styled from 'styled-components';
interface PanelBodyProps {
  active?: boolean;
}
export const PanelBody = styled.div<PanelBodyProps>`
  display: ${props => (props.active ? 'flex' : 'none')};
  animation: sweep 0.125s ease-in-out;
  width: 100%;
`;
