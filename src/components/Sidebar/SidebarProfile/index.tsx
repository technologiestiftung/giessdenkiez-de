import React, { FC } from 'react';
import styled from 'styled-components';
import { CSVLink } from "react-csv";
import { useAuth0 } from '../../../utils/auth/auth0';
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
import { useCanExportUserData } from '../../../utils/hooks/useCanExportUserData';
import { useUserProfileActions } from '../../../utils/hooks/useUserProfileActions';
import { UserProfile, UserDataType, Tree, WateringType } from '../../../common/interfaces';
import { SidebarLoading } from '../SidebarLoading';
import SmallParagraph from '../../SmallParagraph';
import UsersWateringsList from '../../UsersWateringsList';
import { useState } from 'react';
import { useEffect } from 'react';

const LastButtonRound = styled(ButtonRound)`
  margin-bottom: 20px !important;
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

const SidebarProfile: FC<{
  isLoading?: boolean;
  userData?: UserDataType | undefined;
}> = ({ userData: userDataProps, isLoading: isLoadingProps }) => {
  const csvLink = React.createRef();
  const [csvData, setCsvData] = useState<string | undefined>()
  const { userData: userDataState } = useUserData();
  const { deleteAccount } = useAccountActions();
  const { canExportUserData } = useCanExportUserData();
  const { exportUserData } = useUserProfileActions();
  const { loading: isLoadingState } = useAuth0();
  const isLoading = isLoadingProps || isLoadingState;
  const isLocalTesting = process.env.LOCAL_TESTING;
  const localUserProfile: UserProfile = {
    uuid: "0815",
    email: "a@b.c",
    prefered_username: "ABC"
  }
  const numbers =  Array.from({length:15},(v,k)=>k+1)
  const adoptedTrees: Array<Tree> = numbers.map(num => ({ id: "" + num }))
  const waterings: Array<WateringType> =  numbers.map(num => ({
    id: "" + num,
    treeId: "" + (num % 5),
    username: "example",
    amount: Number.parseInt((Math.random() * 200).toPrecision(1)),
    timestamp: "2021-05-25T09:15:00.000"
  }))
  const localUserData = {
    id: "0815",
    email: "a@b.c",
    username: "abc",
    userProfile: localUserProfile,
    isVerified: true,
    adoptedTrees,
    waterings
  };
  const userData = userDataProps || userDataState || (isLocalTesting ? localUserData : false);

  const handleDeleteClick = async () => {
    if (!confirmAccountDeletion()) return;
    deleteAccount();
  };

  useEffect(() => {
    setTimeout(() => {
      if (csvLink.current != null && csvData) {
        csvLink.current.link.click();
        setCsvData(undefined)
      }
    });
  }, [csvData])

  const downloadUserDataCsv = async () => {
    const data = await exportUserData();
    setCsvData(data);
  }

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
          'Du hast noch keine Gießpatenschaft für einen Baum übernommen.'
        ) : (
          <TreesList trees={userData.adoptedTrees} />
        )}
      </ExpandablePanel>
      <ExpandablePanel
        isExpanded={false}
        title={
          <>
            Letzte Bewässerungen
            <SmallParagraph>Neueste zuerst</SmallParagraph>
          </>
        }
      >
        <UsersWateringsList waterings={userData.waterings} showTreeName={true} />
      </ExpandablePanel>
      <UserCredentials 
        userId={userData.id} 
        email={userData.email} 
        username={userData.username} 
        userProfile={userData.userProfile || {}} 
      />
      { canExportUserData && (
        <>
          <ButtonRound margin='15px' onClick={downloadUserDataCsv}>
            Download aller Nutzerdaten
          </ButtonRound>
          <CSVLink 
            filename={"benutzer.csv"} 
            data={csvData || ""}
            ref={csvLink}
          />
        </>
      )}
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
