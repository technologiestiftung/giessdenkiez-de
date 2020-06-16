import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  padding: 8px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  letter-spacing: 0.25px;
  text-decoration: none;
  font-size: 13px;
  border: 1px solid
    ${p => {
      if (p.state === p.id) {
        return p.theme.colorPrimary;
      } else {
        return p.theme.colorTextMedium;
      }
    }};
  border-radius: ${p => p.theme.borderRadius};
  color: ${p => {
    if (p.state === p.id) {
      return p.theme.colorPrimary;
    } else {
      return p.theme.colorTextDark;
    }
  }};
  transition: ${p => p.theme.transition};
  margin-right: 10px;

  &:last-of-type() {
    margin-right: 0px;
  }

  &:hover {
    color: ${p => {
      if (p.state === p.id) {
        return p.theme.colorPrimaryHover;
      } else {
        return p.theme.colorTextMedium;
      }
    }};
    transition: ${p => p.theme.transition};
  }
`;

export default StyledLink;
