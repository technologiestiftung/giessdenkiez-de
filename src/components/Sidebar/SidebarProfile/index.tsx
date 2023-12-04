import React, { FC } from 'react';
import styled from 'styled-components';
import { useUserData } from '../../../utils/hooks/useUserData';

import Paragraph from '../../Paragraph';
import WateredTreesIndicator from '../../WateredTreesIndicator';
import ExpandablePanel from '../../ExpandablePanel';
import UserCredentials from '../../UserCredentials';
import TreesList from '../../TreesList';
import { NonVerfiedMailMessage } from '../../NonVerfiedMailMessage';
import Login from '../../Login';
import ButtonRound from '../../ButtonRound';
import SidebarTitle from '../SidebarTitle/';
import { ParticipateButton } from '../../ParticipateButton';
import { useAccountActions } from '../../../utils/hooks/useAccountActions';
import { StyledComponentType, UserDataType } from '../../../common/interfaces';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { SidebarLoading } from '../SidebarLoading';
import { useUserProfile } from '../../../utils/hooks/useUserProfile';
const LastButtonRound = styled(ButtonRound)`
  margin-bottom: 20px !important;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const WateringsTitle = styled.span<StyledComponentType>`
  font-size: ${p => p.theme.fontSizeXl};
  font-weight: bold;
`;

const confirmAccountDeletion = (): boolean =>
  window.confirm(
    `🚨 🚨 🚨
Willst du deinen Account wirklich löschen? Diese Aktion ist endgültig.
Alle deine Benutzerdaten werden damit sofort gelöscht!`
  );

const SidebarProfile: FC<{
  isLoading?: boolean;
  userData?: UserDataType | undefined;
}> = ({ isLoading: isLoadingProps }) => {
  const { userData: userDataState } = useUserData();
  const { userProfile } = useUserProfile();
  const { deleteAccount } = useAccountActions();
  const userData = userDataState ?? false;
  const { isLoading: isLoadingSupase, session } = useSessionContext();
  const isAuthenticated = session?.user?.id ? true : false;
  const isLoadingAuthInfo = isAuthenticated && !userData;
  const isLoading = isLoadingProps || isLoadingSupase || isLoadingAuthInfo;

  const handleDeleteClick = (): void => {
    if (!confirmAccountDeletion()) return;
    void deleteAccount();
  };

  if (isLoading) {
    return <SidebarLoading title='Profil' />;
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
      <UserCredentials
        email={userData.email}
        username={userProfile?.username ?? ''}
      />
      <br />
      <Login width='-webkit-fill-available' />
      <>
        <Paragraph>
          Möchtest du deinen Account löschen? Damit werden alle von dir
          generierten Wässerungsdaten einem anonymen Benutzer zugeordnet. Dein
          Benutzer bei unserem Authentifizierungsdienst Supabase.com wird sofort
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
