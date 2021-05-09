import React, { FC } from 'react';
import styled from 'styled-components';
import SmallParagraph from '../SmallParagraph';

// file-loader will be removed in separate issue
const iconGithub = '/images/icon-github.svg';

const OpenSourceContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 12px;
  margin-bottom: 16px;
  align-items: center;
`;

const GithubIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const OpenSourceNote: FC = () => {
  return (
    <OpenSourceContainer>
      <GithubIcon alt='GitHub Mark' src={iconGithub} />
      <SmallParagraph>
        LEIPZIG GIESST ist ein&nbsp;
        <a
          target='blank'
          href='https://github.com/codeforleipzig/tsb-trees-frontend'
        >
          Open Source Projekt!
        </a>
      </SmallParagraph>
    </OpenSourceContainer>
  );
};

export default OpenSourceNote;
