import React, { FC } from 'react';
import styled from 'styled-components';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
} from 'react-share';
import Image from 'next/image';

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
  return (
    <StyledContainer>
      <span>Teile Gieß den Kiez mit deinem Umfeld und hilf uns die Gieß-Community zu vergrößern:</span>
      <ButtonsContainer>
        <FacebookShareButton url='https://www.giessdenkiez.de/'>
          <FacebookIcon size={36} round />
        </FacebookShareButton>
        <TwitterShareButton url='https://www.giessdenkiez.de/'>
          <TwitterIcon size={36} round />
        </TwitterShareButton>
        <WhatsappShareButton url='https://www.giessdenkiez.de/'>
          <WhatsappIcon size={36} round />
        </WhatsappShareButton>
        <EmailShareButton url='https://www.giessdenkiez.de/'>
        <Image
                src={mailIcon}
                width={36}
                height={36}
                alt='Calendar Icon'
              />
        </EmailShareButton>
      </ButtonsContainer>
    </StyledContainer>
  );
};

export default SocialSharing;
