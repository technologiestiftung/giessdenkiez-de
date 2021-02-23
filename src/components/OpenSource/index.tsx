import React from 'react';
import styled from 'styled-components';
import CardDescription from '../Card/CardDescription';
// file-loader will be removed in separate issue
// eslint-disable-next-line import/no-webpack-loader-syntax
const iconGithub = '/images/icon-github.svg';

const OpenSourceContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 12px;
  margin-bottom: 10px;
  place-items: center;
`;

const GithubIcon = styled.img`
  width: 16px;
  height: 16px;
`

const OpenSourceNote = () => {
  return (
    <OpenSourceContainer>
	  <GithubIcon alt='GitHub Mark' src={iconGithub} />
      <CardDescription>
        Giess den Kiez ist ein&nbsp;
        <a
          target='blank'
          href='https://github.com/technologiestiftung/giessdenkiez-de'
        >
          Open Source Projekt!
        </a>
      </CardDescription>
    </OpenSourceContainer>
  );
};

export default OpenSourceNote;
