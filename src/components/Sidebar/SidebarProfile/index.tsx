import React, { FC, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../../../utils/auth/auth0';
import store from '../../../state/Store';
import { useStoreState } from '../../../state/unistore-hooks';

import { createAPIUrl, requests } from '../../../utils';

import SidebarTitle from '../SidebarTitle/';
import Login from '../../Login';
import CardHeadline from '../../Card/CardHeadline/';
import CardParagraph from '../../Card/CardParagraph/';
import CardDescription from '../../Card/CardDescription/';
import CardProgress from '../../Card/CardProgress/';
import CardAccordion from '../../Card/CardAccordion/';
import CardCredentials from '../../Card/CardCredentials/';
import TreesAdopted from '../../Card/CardAccordion/TreesAdopted';
import ButtonRound from '../../ButtonRound';
import LoadingIcon from '../../LoadingIcon/';
import { NonVerfiedMailCardParagraph } from '../../Card/non-verified-mail';

const LastButtonRound = styled(ButtonRound)`
  margin-bottom: 20px !important;
`;

const StyledCardDescription = styled(CardDescription)`
  opacity: 0.66;
  text-decoration: underline;
  padding-top: 10px;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;
  &:hover {
    opacity: 0.5;
  }
`;

const Container = styled.div`
  width: 100%;
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

const SidebarProfile: FC = () => {
  const { wateredByUser } = useStoreState('wateredByUser');
  const { adoptedTrees } = useStoreState('adoptedTrees');
  const { adoptedTreesDetails } = useStoreState('adoptedTreesDetails');
  const { user: userdata } = useStoreState('user');

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (adoptedTrees) {
          const concatReducer = (acc, curr, currentIndex, array) => {
            if (currentIndex + 1 === array.length) {
              return acc + curr + '}';
            } else {
              return acc + curr + ',';
            }
          };

          const queryStr = adoptedTrees.reduce(concatReducer, '{');
          const urlAdoptedTreesDetails = createAPIUrl(
            store.getState(),
            `/get/?queryType=treesbyids&tree_ids=${queryStr}`
          );
          const res = await requests(urlAdoptedTreesDetails);
          store.setState({ adoptedTreesDetails: res.data });
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    if (adoptedTrees && adoptedTrees.length === 0) {
      store.setState({ adoptedTreesDetails: [] });
    } else {
      fetchData().catch(err => {
        console.error(err);
        throw err;
      });
    }
  }, [adoptedTrees]);

  const handleDeleteClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    try {
      event.preventDefault();
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
          <StyledCardDescription
            onClick={() => store.setState({ overlay: true })}
          >
            Wie kann ich mitmachen?
          </StyledCardDescription>
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
                  <CardProgress data={wateredByUser} />
                  <CardAccordion
                    active={true}
                    title={<span>Adoptierte Bäume</span>}
                  >
                    {adoptedTreesDetails && (
                      <TreesAdopted data={adoptedTreesDetails} />
                    )}
                  </CardAccordion>
                  <CardCredentials
                    email={userdata.email}
                    username={userdata.username}
                  ></CardCredentials>
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
                      toggle={handleDeleteClick}
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
