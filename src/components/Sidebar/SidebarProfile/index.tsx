import React, { FC } from 'react';
import styled from 'styled-components';
import { useQuery, QueryFunction } from 'react-query';

import { useAuth0 } from '../../../utils/auth/auth0';
import { useStoreState } from '../../../state/unistore-hooks';

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
import { Tree } from '../../../common/interfaces';
import { ParticipateButton } from '../../ParticipateButton';
import { getTreesByIds } from '../../../utils/requests/getTreesByIds';
import { deleteAccount } from '../../../utils/requests/deleteAccount';

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

const fetchAdoptedTreesDetails: QueryFunction<Tree[]> = async ({
  queryKey,
}) => {
  const [_key, { adoptedTrees }] = queryKey;
  if (adoptedTrees.length === 0) return [];
  return await getTreesByIds(adoptedTrees);
};

const confirmAccountDeletion = (): boolean =>
  window.confirm(
    `🚨 🚨 🚨
Willst du deinen Account wirklich löschen? Diese Aktion ist endgültig.
Alle deine Benutzerdaten werden damit sofort gelöscht!`
  );

const SidebarProfile: FC = () => {
  const { wateredByUser } = useStoreState('wateredByUser');
  const { adoptedTrees } = useStoreState('adoptedTrees');
  const { data: adoptedTreesDetails } = useQuery(
    ['adoptedTreesDetails', { adoptedTrees: (adoptedTrees || []) as string[] }],
    fetchAdoptedTreesDetails,
    { staleTime: 10000 }
  );

  const {
    loading,
    user,
    isAuthenticated,
    getTokenSilently,
    logout,
  } = useAuth0();
  const isEmailVerifiyed = user && user.email_verified;

  const handleDeleteClick = async () => {
    if (!confirmAccountDeletion()) return;

    const token = await getTokenSilently();
    await deleteAccount({ token, userId: user.sub })
      .then(() => logout())
      .catch(console.error);
  };

  if (loading) {
    return (
      <>
        <SidebarTitle>Profil</SidebarTitle>
        Lade Profil ...
      </>
    );
  }

  if (!isAuthenticated) {
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

  if (!isEmailVerifiyed) {
    return (
      <>
        <SidebarTitle>Profil</SidebarTitle>
        <NonVerfiedMailCardParagraph />
      </>
    );
  }

  if (!wateredByUser || !adoptedTreesDetails) {
    return (
      <>
        <SidebarTitle>Profil</SidebarTitle>
        <Container>
          <LoadingIcon text='Lade Profil ...' />
        </Container>
      </>
    );
  }

  return (
    <>
      <SidebarTitle>Profil</SidebarTitle>
      <CardHeadline>Dein Gießfortschritt</CardHeadline>
      <CardProgress trees={wateredByUser} />
      <CardAccordion active={true} title={<span>Adoptierte Bäume</span>}>
        {adoptedTreesDetails && <TreesAdopted trees={adoptedTreesDetails} />}
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
