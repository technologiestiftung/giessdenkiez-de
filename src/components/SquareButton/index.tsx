import styled from 'styled-components';

interface ButtonProps {
  size?: number;
  isActive?: boolean;
}

const SquareButton = styled.button<ButtonProps>`
  width: ${props => props.size || 64}px;
  height: ${props => props.size || 64}px;
  background-color: ${props =>
    props.isActive ? props.theme.colorTextDark : '#fff'};
  color: ${props => (props.isActive ? '#fff' : props.theme.colorTextDark)};
  transition: background-color 0.3s;
  will-change: background-color;
  border-radius: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: none;
  outline: none;
  border: none;
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: border-box;

  &:hover {
    background-color: ${props =>
      props.isActive ? props.theme.colorTextDark : '#f2f2f2'};
    color: ${props => (props.isActive ? '#fff' : props.theme.colorTextDark)};
  }
`;

export default SquareButton;
