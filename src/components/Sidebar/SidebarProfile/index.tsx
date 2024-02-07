import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useUserData } from '../../../utils/hooks/useUserData';

import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { StyledComponentType, UserDataType } from '../../../common/interfaces';
import { useAccountActions } from '../../../utils/hooks/useAccountActions';
import { useUserProfile } from '../../../utils/hooks/useUserProfile';
import ButtonRound from '../../ButtonRound';
import ExpandablePanel from '../../ExpandablePanel';
import Login from '../../Login';
import { NonVerfiedMailMessage } from '../../NonVerfiedMailMessage';
import Paragraph from '../../Paragraph';
import { ParticipateButton } from '../../ParticipateButton';
import TreesList from '../../TreesList';
import UserCredentials from '../../UserCredentials';
import WateredTreesIndicator from '../../WateredTreesIndicator';
import { SidebarLoading } from '../SidebarLoading';
import SidebarTitle from '../SidebarTitle/';

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
Willst Du Deinen Account wirklich löschen? Diese Aktion ist endgültig.
Alle Deine Benutzerdaten werden damit sofort gelöscht!`
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
  const { replace: routerReplace } = useRouter();
  const { logout } = useAccountActions();
  const [requestedLogout, setRequestedLogout] = useState(false);

  useEffect(() => {
    if (!session && !requestedLogout) routerReplace('/auth');
  }, [requestedLogout, session, routerReplace]);

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
            Du bist momentan nicht eingeloggt. Wenn Du das Gießen von Bäumen in
            Deiner Umgebung hier eintragen möchtest, dann registriere Dich oder
            logge Dich ein.
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
      <Login
        width='-webkit-fill-available'
        onLogout={() => {
          setRequestedLogout(true);
          logout();
        }}
      />
      <>
        <Paragraph>
          Möchtest Du deinen Account löschen? Damit werden alle von dir
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
