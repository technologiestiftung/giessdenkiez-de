import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

const NumberInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: ${p => p.theme.fontSizeLl};
`;

const StyledInput = styled.input`
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

export interface NumberInputType {
  id: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const NumberInput: FC<NumberInputType> = ({
  id,
  label,
  min = 0,
  max,
  step = 1,
  placeholder = '0',
  onChange = () => undefined,
}) => {
  return (
    <NumberInputContainer>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput
        type='number'
        id={id}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        size={1}
        defaultValue={min}
        placeholder={placeholder}
        pattern='[0-9]*'
        inputMode='numeric'
      />
    </NumberInputContainer>
  );
};
