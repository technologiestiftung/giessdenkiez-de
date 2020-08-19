import React from 'react';
import styled from 'styled-components';
import CardDescription from '../Card/CardDescription';
// file-loader will be removed in separate issue
// eslint-disable-next-line import/no-webpack-loader-syntax
const iconGithub = '/images/icon-github.svg';

const OpenSourceContainer = styled.div`
  display: flex;
  margin-bottom: 10px;

  img {
    width: 16px;
    height: auto;
    margin-right: 5px;
  }
`;

const OpenSourceNote = () => {
  return (
    <OpenSourceContainer>
      <img alt='GitHub Mark' src={iconGithub} />
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
