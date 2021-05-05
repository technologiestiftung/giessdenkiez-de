import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface TooltipValuesType {
  [key: string]: string;
}
export interface TooltipProps {
  title: string;
  subtitle?: string;
  items: TooltipValuesType;
  children?: ReactNode;
}

const StyledWrapper = styled.div`
  max-width: 340px;
  display: block;
  /* box-shadow: rgba(51, 51, 102, 0.5) 2px 2px 2px; */
  padding ${({ theme }) => theme.spacingM};
  background-color: ${({ theme }) => theme.colorWhite};
`;

const StyledHeader = styled.header`
  padding-bottom: ${({ theme }) => theme.spacingM};
  border-bottom: 1px solid ${({ theme }) => theme.colorGreyLight};
`;

const StyledTitle = styled.h3`
  font-size: ${props => props.theme.fontSizeXl};
  color: ${({ theme }) => theme.colorTextDark};
  margin: 0;
`;

const StyledSubtitle = styled.h4`
  font-size: ${props => props.theme.fontSizeLl};
  font-weight: normal;
  color: ${({ theme }) => theme.colorTextLight};
  margin: 2px 0 0;
`;

const StyledChildrenWrapper = styled.div`
  &:not(:empty) {
    margin: ${({ theme }) => theme.spacingS} 0 0;
  }
`;

const StyledTable = styled.div`
  font-size: ${props => props.theme.fontSizeL};
  font-family: ${props => props.theme.fontFamily};
  width: 100%;
  display: block;
`;

const StyledTableRow = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colorGreyLight};
  color: ${({ theme }) => theme.colorTextDark};
  > th {
    font-weight: bold;
  }
  > td {
    font-weight: normal;
  }
`;

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  subtitle,
  items,
  children,
}) => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledTitle>{title}</StyledTitle>
        {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
        {children && <StyledChildrenWrapper>{children}</StyledChildrenWrapper>}
      </StyledHeader>
      <StyledTable>
        {Object.entries(items).map(([key, value]) => {
          return (
            <StyledTableRow key={`row-${key}`}>
              <th>{key}</th>
              <td>{value}</td>
            </StyledTableRow>
          );
        })}
      </StyledTable>
    </StyledWrapper>
  );
};
