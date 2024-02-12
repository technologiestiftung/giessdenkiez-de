import React, { FC } from 'react';
import styled from 'styled-components';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
} from 'react-share';
import Image from 'next/image';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

const mailIcon = '/images/mail_icon.svg';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  span {
    font-size: ${p => p.theme.fontSizeL};
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;

  > *:not(:first-child) {
    margin-left: 10px;
  }
`;

const SocialSharing: FC = () => {
  const content = useLocalizedContent();
  return (
    <StyledContainer>
      <span>{content.sharing.title}</span>
      <ButtonsContainer>
        <FacebookShareButton
          aria-label='facebook-sharing-button'
          url='https://www.giessdenkiez.de/'
        >
          <FacebookIcon size={36} round />
        </FacebookShareButton>
        <TwitterShareButton
          aria-label='x-sharing-button'
          title={content.sharing.content}
          url='https://www.giessdenkiez.de/'
        >
          <XIcon size={36} round />
        </TwitterShareButton>
        <WhatsappShareButton
          aria-label='whatsapp-sharing-button'
          title={content.sharing.content}
          url='https://www.giessdenkiez.de/'
        >
          <WhatsappIcon size={36} round />
        </WhatsappShareButton>
        <EmailShareButton
          aria-label='mail-sharing-button'
          url='https://www.giessdenkiez.de/'
          body={content.sharing.content}
        >
          <Image src={mailIcon} width={36} height={36} alt='Mail Icon' />
        </EmailShareButton>
      </ButtonsContainer>
    </StyledContainer>
  );
};

export default SocialSharing;
