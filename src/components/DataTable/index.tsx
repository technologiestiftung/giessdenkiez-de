import React, { HTMLProps } from 'react';
import styled from 'styled-components';

export interface TableItemsType {
  [key: string]: string;
}
export interface DataTableType extends HTMLProps<HTMLDivElement> {
  title: string;
  subtitle?: string;
  items: TableItemsType;
}

const StyledWrapper = styled.div`
  width: 100%;
  display: block;
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

const StyledTable = styled.table`
  font-size: ${props => props.theme.fontSizeL};
  font-family: ${props => props.theme.fontFamily};
  width: 100%;
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

export const DataTable: React.FC<DataTableType> = ({
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
        <tbody>
          {Object.entries(items).map(([key, value]) => {
            return (
              <StyledTableRow key={`row-${key}`}>
                <th>{key}</th>
                <td>{value}</td>
              </StyledTableRow>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledWrapper>
  );
};
