import styled from 'styled-components';

export const StyledFormTextInput = styled.input`
  flex: 1;
  padding: 10px;
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid ${p => p.theme.colorTextMedium};
  color: ${p => p.theme.colorTextDark};
  &::selection {
    background: ${p => p.theme.colorPrimary};
    color: white;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;
