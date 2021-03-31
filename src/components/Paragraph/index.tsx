import styled from 'styled-components';

export default styled.p`
  font-size: ${p => p.theme.fontSizeL};
  opacity: 1;
  line-height: 150%;
  width: 100%;

  a {
    color: #2c303b;
    transition: opacity 200ms ease-out;
    opacity: 1;
  }
  a:hover {
    opacity: 0.33;
  }
`;
