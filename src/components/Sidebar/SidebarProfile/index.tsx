import React, { FC } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../../../utils/auth/auth0';
import { useUserState } from '../../../utils/hooks/useUserState';

import Paragraph from '../../Paragraph';
import WateredTreesIndicator from '../../WateredTreesIndicator';
import ExpandablePanel from '../../ExpandablePanel';
import UserCredentials from '../../UserCredentials';
import TreesList from '../../TreesList';
import { NonVerfiedMailMessage } from '../../NonVerfiedMailMessage';
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

const WateringsTitle = styled.span`
  font-size: ${p => p.theme.fontSizeXl};
  font-weight: bold;
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
          <Paragraph>
            Du bist momentan nicht eingeloggt. Wenn du das Gießen von Bäumen in
            deiner Umgebung hier eintragen möchtest, dann registriere dich oder
            logge dich ein.
          </Paragraph>
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
        <NonVerfiedMailMessage />
      </>
    );
  }

  return (
    <>
      <SidebarTitle>Profil</SidebarTitle>
      <WateringsTitle>Dein Gießfortschritt</WateringsTitle>
      <WateredTreesIndicator waterings={userData.waterings} />
      <ExpandablePanel isExpanded title={<span>Adoptierte Bäume</span>}>
        {userData.adoptedTrees.length === 0 ? (
          'Du hast noch keine Bäume adoptiert.'
        ) : (
          <TreesList trees={userData.adoptedTrees} />
        )}
      </ExpandablePanel>
      <UserCredentials email={userData.email} username={userData.username} />
      <br />
      <Login width='-webkit-fill-available' />
      <>
        <Paragraph>
          Möchtest du deinen Account löschen? Damit werden alle von dir
          generierten Wässerungsdaten einem anonymen Benutzer zugeordnet. Dein
          Benutzer bei unserem Authentifizierungsdienst Auth0.com wird sofort
          und unwiderruflich gelöscht.
        </Paragraph>
        <LastButtonRound
          width='-webkit-fill-available'
          onClick={evt => {
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
