import styled from 'styled-components';

const SmallParagraph = styled.p`
  line-height: 150%;
  font-size: ${p => p.theme.fontSizeL};
  opacity: 0.66;
  letter-spacing: 0.125px;
  padding: 0;
  margin: 0;
  font-weight: normal;
`;

export default SmallParagraph;
