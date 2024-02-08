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
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

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

const SidebarProfile: FC<{
  isLoading?: boolean;
  userData?: UserDataType | undefined;
}> = ({ isLoading: isLoadingProps }) => {
  const content = useLocalizedContent();
  const {
    loggedInHint,
    title,
    progress,
    adoptedTrees,
    noTreesAdopted,
    deleteAccountHint,
    deleteAccountAction,
    deleteAccountWarning,
  } = content.sidebar.profile;
  const { userData: userDataState } = useUserData();
  const { userProfile } = useUserProfile();
  const { deleteAccount } = useAccountActions();
  const userData = userDataState ?? false;
  const { isLoading: isLoadingSupase, session } = useSessionContext();
  const isAuthenticated = session?.user?.id ? true : false;
  const isLoadingAuthInfo = isAuthenticated && !userData;
  const isLoading = isLoadingProps || isLoadingSupase || isLoadingAuthInfo;
  const { logout } = useAccountActions();
  const [requestedLogout, setRequestedLogout] = useState(false);
  const { replace: routerReplace } = useRouter();

  useEffect(() => {
    if (!session && !requestedLogout) routerReplace('/auth');
  }, [requestedLogout, session, routerReplace]);

  const confirmAccountDeletion = (): boolean =>
    window.confirm(deleteAccountWarning);

  const handleDeleteClick = (): void => {
    if (!confirmAccountDeletion()) return;
    void deleteAccount();
  };

  if (isLoading) {
    return <SidebarLoading title={title} />;
  }
  if (!userData) {
    return (
      <>
        <SidebarTitle>{title}</SidebarTitle>
        <FlexCol>
          <Paragraph>{loggedInHint}</Paragraph>
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
      <SidebarTitle>{title}</SidebarTitle>
      <WateringsTitle>{progress}</WateringsTitle>
      <WateredTreesIndicator waterings={userData.waterings} />
      <ExpandablePanel $isExpanded title={<span>{adoptedTrees}</span>}>
        {userData.adoptedTrees.length === 0 ? (
          noTreesAdopted
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
        <Paragraph>{deleteAccountHint}</Paragraph>
        <LastButtonRound
          width='-webkit-fill-available'
          onClick={evt => {
            evt?.preventDefault();
            handleDeleteClick();
          }}
        >
          {deleteAccountAction}
        </LastButtonRound>
      </>
    </>
  );
};

export default SidebarProfile;
