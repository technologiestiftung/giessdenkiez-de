import styled from 'styled-components';

interface StyledButtonProps {
  isActive?: boolean;
  size?: string;
}
export default styled.button<StyledButtonProps>`
  width: ${props => props.size || 36}px;
  height: ${props => props.size || 36}px;
  background-color: ${props =>
    props.isActive ? props.theme.colorPrimary : 'white'};
  color: ${p => p.theme.colorTextDark};
  border: 1px solid ${p => p.theme.colorTextDark};
  transition: background-color 0.3s ease-out, box-shadow 200ms ease-out;
  will-change: background-color;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  cursor: pointer;
  box-shadow: none;
  outline: none;
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: border-box;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    background-color: ${p => p.theme.colorTextDark};
    color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px;
  }
`;
