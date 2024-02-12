import React, { FC } from 'react';
import styled from 'styled-components';
import SmallParagraph from '../SmallParagraph';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

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
  const content = useLocalizedContent();
  const { openSourceLink, openSourceNote, openSourceText } = content.sidebar;
  return (
    <OpenSourceContainer>
      <GithubIcon alt='GitHub Mark' src={iconGithub} />
      <SmallParagraph>
        {openSourceNote}{' '}
        <a target='blank' href={openSourceLink}>
          {openSourceText}
        </a>
      </SmallParagraph>
    </OpenSourceContainer>
  );
};

export default OpenSourceNote;
