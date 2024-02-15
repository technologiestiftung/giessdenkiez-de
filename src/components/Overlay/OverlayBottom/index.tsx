import React, { FC } from 'react';
import styled from 'styled-components';

import content from '../../../assets/content';

const StyledBottom = styled.div`
  opacity: 1;
  height: auto;
  border-top: 1px solid ${({ theme }) => theme.colorPrimaryHover};
  background: #f7fffa url('/images/city-skyline.svg') no-repeat right -40px bottom -2px;
  background-size: 50% auto;
  padding: 30px 40px;
  grid-area: sales;

  @media screen and (min-width: ${p =>
      p.theme.screens.tablet}) and (max-width: ${p => p.theme.screens.laptop}) {
    background-position: right -200px bottom;
  }

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    background-position: right bottom;
    background-size: auto 80px;
  }

  @media screen and (max-width: 650px) {
    padding-bottom: 100px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 540px;
  text-wrap: balance;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    display: flex;
    gap: 4px;
  }
`;

const StyledSalesTitle = styled.h2`
  margin: 0;
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: column;
  column-gap: 8px;
  row-gap: 4px;
  font-size: 1rem;
  line-height: 1.4rem;
  text-wrap: balance;

  strong {
    font-size: 1.25rem;
  }
  span {
    font-weight: 400;
    font-size: 1rem;
  }
`;

const StyledSalesButton = styled.a`
  color: ${({ theme }) => theme.colorTextDark};
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colorPrimary};
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
  font-size: 1rem;
  transition: color 0.2s ease-in-out;
  display: inline-block;
  align-self: flex-start;

  &:hover {
    color: ${({ theme }) => theme.colorPrimary};
  }

  &:focus {
    outline: none;
  }
  &:focus-visible {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colorPrimaryVeryLight},
      0 0 0 6px ${({ theme }) => theme.colorPrimary};
    border-radius: 1px;
  }
`;

const OverlayBottom: FC = () => {
  const { sales } = content;

  return (
    <StyledBottom>
      <StyledContainer>
        <StyledSalesTitle>
          <strong dangerouslySetInnerHTML={ {__html: sales.title }}></strong>
          {sales.subtitle && <span>{sales.subtitle}</span>}
        </StyledSalesTitle>
        <StyledSalesButton
          href={sales.buttonLink}
          target='_blank'
          rel='noopener noreferrer'
        >
          {sales.buttonText}
        </StyledSalesButton>
      </StyledContainer>
    </StyledBottom>
  );
};

export default OverlayBottom;
