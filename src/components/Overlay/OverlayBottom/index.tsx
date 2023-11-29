import React, { FC } from 'react';
import styled from 'styled-components';

import content from '../../../assets/content';

const StyledBottom = styled.div`
  opacity: 1;
  height: auto;
  border-top: 1px solid ${({ theme }) => theme.colorPrimaryHover};
  background: #f7fffa url('/images/city-skyline.svg') no-repeat right -40px bottom;
  background-size: auto 100%;
  padding: 24px 40px;
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
  flex-wrap: wrap;
  gap: 16px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const StyledSalesTitle = styled.h2`
  font-weight: 800;
  font-size: 1rem;
  margin: 0;
  display: inline-flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 4px;

  span {
    font-weight: 400;
  }

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    flex-direction: column;
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
  &:hover {
    color: ${({ theme }) => theme.colorPrimary};
  }
`;

const OverlayBottom: FC = () => {
  const { sales } = content;

  return (
    <StyledBottom>
      <StyledContainer>
        <StyledSalesTitle>
          <strong>{sales.title}</strong>
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
