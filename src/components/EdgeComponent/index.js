import styled from 'styled-components';

export default styled.button`
  width: ${props => props.size || 72}px;
  height: ${props => props.size || 72}px;
  background-color: ${props => (props.isActive ? '#000' : '#fff')};
  color: ${props => (props.isActive ? '#fff' : '#000')};
  transition: background-color .3s;
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
    background-color: ${props => (props.isActive ? '#000' : '#f2f2f2')};
    color: ${props => (props.isActive ? '#fff' : '#000')};
  }
`;
