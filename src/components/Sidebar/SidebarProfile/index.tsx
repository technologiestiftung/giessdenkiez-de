import React, { FC, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, QueryFunction } from 'react-query';

import { useAuth0 } from '../../../utils/auth/auth0';
import { useStoreState } from '../../../state/unistore-hooks';
import { createAPIUrl, requests } from '../../../utils';

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

const fetchData: QueryFunction<Tree[]> = async ({ queryKey }) => {
  const [_key, { adoptedTrees }] = queryKey;

  if (adoptedTrees.length === 0) return [];

  const queryStr = adoptedTrees.reduce(
    (acc: string, curr: string, idx: number) =>
      idx + 1 === adoptedTrees.length ? `${acc}${curr}}` : `${acc}${curr},`,
    '{'
  );

  const urlAdoptedTreesDetails = createAPIUrl(
    `/get/?queryType=treesbyids&tree_ids=${queryStr}`
  );
  const res = await requests(urlAdoptedTreesDetails);
  return res.data;
};

const SidebarProfile: FC = () => {
  const { wateredByUser } = useStoreState('wateredByUser');
  const { adoptedTrees } = useStoreState('adoptedTrees');
  const { data: adoptedTreesDetails } = useQuery(
    ['adoptedTreesDetails', { adoptedTrees: (adoptedTrees || []) as string[] }],
    fetchData,
    { staleTime: 10000 }
  );

  const {
    loading,
    user,
    isAuthenticated,
    getTokenSilently,
    logout,
  } = useAuth0();
  const [isEmailVerifiyed, setIsEmailVerifiyed] = useState(false);

  /**
   * Check whether the email of the user is verified
   */
  useEffect(() => {
    if (!user) return;
    setIsEmailVerifiyed(user.email_verified);
  }, [user, setIsEmailVerifiyed]);

  const handleDeleteClick = async () => {
    try {
      const promptRes = window.confirm(
        '🚨 🚨 🚨 Willst du deinen Account wirklich löschen? Diese Aktion ist  endgültig.\nAlle deine Benutzerdaten werden damit sofort gelöscht!'
      );
      if (promptRes !== true) {
        return;
      }
      const token = await getTokenSilently();
      const res = await window.fetch(
        `${process.env.USER_DATA_API_URL}/api/user?userid=${encodeURIComponent(
          user.sub
        )}`,
        {
          mode: 'cors',
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        logout();
      } else {
        const text = await res.text();
        console.warn(text);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (loading) {
    return (
      <>
        <SidebarTitle>Profil</SidebarTitle>
        <Fragment>Lade Profil ...</Fragment>
      </>
    );
  }

  return (
    <>
      <SidebarTitle>Profil</SidebarTitle>
      {!isAuthenticated ? (
        <FlexCol>
          <CardParagraph>
            Du bist momentan nicht eingeloggt. Wenn du das Gießen von Bäumen in
            deiner Umgebung hier eintragen möchtest, dann registriere dich oder
            logge dich ein.
          </CardParagraph>
          <Login width='-webkit-fill-available' />
          <ParticipateButton />
        </FlexCol>
      ) : (
        <>
          {!isEmailVerifiyed ? (
            <NonVerfiedMailCardParagraph />
          ) : (
            <>
              {wateredByUser && adoptedTreesDetails && (
                <Fragment>
                  <CardHeadline>Dein Gießfortschritt</CardHeadline>
                  <CardProgress trees={wateredByUser} />
                  <CardAccordion
                    active={true}
                    title={<span>Adoptierte Bäume</span>}
                  >
                    {adoptedTreesDetails && (
                      <TreesAdopted trees={adoptedTreesDetails} />
                    )}
                  </CardAccordion>
                  <CardCredentials />
                  <Login width='-webkit-fill-available' />
                  <>
                    <CardParagraph>
                      Möchtest du deinen Account löschen? Damit werden alle von
                      dir generierten Wässerungsdaten einem anonymen Benutzer
                      zugeordnet. Dein Benutzer bei unserem
                      Authentifizierungsdienst Auth0.com wird sofort und
                      unwiderruflich gelöscht.
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
                </Fragment>
              )}
              {!wateredByUser ||
                (!adoptedTreesDetails && (
                  <Container>
                    <LoadingIcon text='Lade Profil ...' />
                  </Container>
                ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SidebarProfile;
