import React, { FC } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../../../utils/auth/auth0';
import { useUserState } from '../../../utils/hooks/useUserState';

import CardHeadline from '../../Card/CardHeadline/';
import CardParagraph from '../../Card/CardParagraph/';
import CardProgress from '../../Card/CardProgress/';
import CardAccordion from '../../Card/CardAccordion/';
import CardCredentials from '../../Card/CardCredentials/';
import TreesAdopted from '../../Card/CardAccordion/TreesAdopted';
import { NonVerfiedMailCardParagraph } from '../../Card/non-verified-mail';
import Login from '../../Login';
import ButtonRound from '../../ButtonRound';
import LoadingIcon from '../../LoadingIcon/';
import SidebarTitle from '../SidebarTitle/';
import { ParticipateButton } from '../../ParticipateButton';

const LastButtonRound = styled(ButtonRound)`
  margin-bottom: 20px !important;
`;

const Container = styled.div`
  height: calc(100vh - 125px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const confirmAccountDeletion = (): boolean =>
  window.confirm(
    `🚨 🚨 🚨
Willst du deinen Account wirklich löschen? Diese Aktion ist endgültig.
Alle deine Benutzerdaten werden damit sofort gelöscht!`
  );

const SidebarProfile: FC = () => {
  const { userData, deleteAccount } = useUserState();
  const { loading } = useAuth0();

  const handleDeleteClick = async () => {
    if (!confirmAccountDeletion()) return;
    deleteAccount();
  };

  if (loading) {
    return (
      <>
        <SidebarTitle>Profil</SidebarTitle>
        <Container>
          <LoadingIcon text='Lade Profil ...' />
        </Container>
      </>
    );
  }

  if (!userData) {
    return (
      <>
        <SidebarTitle>Profil</SidebarTitle>
        <FlexCol>
          <CardParagraph>
            Du bist momentan nicht eingeloggt. Wenn du das Gießen von Bäumen in
            deiner Umgebung hier eintragen möchtest, dann registriere dich oder
            logge dich ein.
          </CardParagraph>
          <Login width='-webkit-fill-available' />
          <ParticipateButton />
        </FlexCol>
      </>
    );
  }

  if (!userData.isVerified) {
    return (
      <>
        <SidebarTitle>Profil</SidebarTitle>
        <NonVerfiedMailCardParagraph />
      </>
    );
  }

  return (
    <>
      <SidebarTitle>Profil</SidebarTitle>
      <CardHeadline>Dein Gießfortschritt</CardHeadline>
      <CardProgress waterings={userData.waterings} />
      <CardAccordion active={true} title={<span>Adoptierte Bäume</span>}>
        <TreesAdopted trees={userData.adoptedTrees} />
      </CardAccordion>
      <CardCredentials />
      <Login width='-webkit-fill-available' />
      <>
        <CardParagraph>
          Möchtest du deinen Account löschen? Damit werden alle von dir
          generierten Wässerungsdaten einem anonymen Benutzer zugeordnet. Dein
          Benutzer bei unserem Authentifizierungsdienst Auth0.com wird sofort
          und unwiderruflich gelöscht.
        </CardParagraph>
        <LastButtonRound
          width='-webkit-fill-available'
          toggle={evt => {
            evt?.preventDefault();
            handleDeleteClick();
          }}
        >
          Account Löschen
        </LastButtonRound>
      </>
    </>
  );
};

export default SidebarProfile;
