import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../../../utils/auth0';
import Actions from '../../../state/Actions';
import { connect } from 'unistore/react';
import Store from '../../../state/Store';
import { fetchAPI, createAPIUrl } from '../../../utils';

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

const SidebarProfile = p => {
  const {
    state,
    wateredByUser,
    adoptedTrees,
    adoptedTreesDetails,
    toggleOverlay,
    userdata,
  } = p;
  const {
    loading,
    user,
    isAuthenticated,
    getTokenSilently,
    logout,
  } = useAuth0();
  const [isEmailVerifiyed, setIsEmailVerifiyed] = useState(false);
  /**
   * Check weather the email of the user is verified
   */
  useEffect(() => {
    if (!user) return;
    setIsEmailVerifiyed(user.email_verified);
  }, [user, setIsEmailVerifiyed]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && adoptedTrees) {
        const token = await getTokenSilently();
        const concatReducer = (acc, curr, currentIndex, array) => {
          if (currentIndex + 1 === array.length) {
            return acc + curr + '}';
          } else {
            return acc + curr + ',';
          }
        };

        const queryStr = adoptedTrees.reduce(concatReducer, '{');

        const urlAdoptedTreesDetails = createAPIUrl(
          state,
          `/private/get-adopted-trees-details?tree_ids=${queryStr}`
        );

        fetchAPI(urlAdoptedTreesDetails, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
          .then(r => {
            //@ts-ignore
            Store.setState({ adoptedTreesDetails: r.data });
            return;
          })
          .catch(err => {
            console.error(err);
          });
      }
    };
    if (adoptedTrees.length === 0) {
      //@ts-ignore
      Store.setState({ adoptedTreesDetails: [] });
    } else {
      fetchData();
    }
  }, [adoptedTrees]);

  const handleDeleteClick = async event => {
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
  // Deep nested ternary operations
  // should this resolved to if else states?
  // or to
  return (
    <>
      {/* <button onClick={() => {getUserDataFromManagementApi()}}>get user data from management api</button> */}
      <SidebarTitle>Profil</SidebarTitle>
      {/* If the user is not authenticated give him the notice */}
      {!isAuthenticated ? (
        <FlexCol>
          <CardParagraph>
            Du bist momentan nicht eingeloggt. Wenn du das Gießen von Bäumen in
            deiner Umgebung hier eintragen möchtest, dann registriere dich oder
            logge dich ein.
          </CardParagraph>
          <Login width='-webkit-fill-available' />
          <StyledCardDescription onClick={() => toggleOverlay(true)}>
            Wie kann ich mitmachen?
          </StyledCardDescription>
        </FlexCol>
      ) : (
        <>
          {/* okay we are aoutheticated but we don't have a email verification */}
          {!isEmailVerifiyed ? (
            <NonVerfiedMailCardParagraph />
          ) : (
            <>
              {/* the user is autheticated and has trees and adopted trees */}
              {wateredByUser && adoptedTreesDetails && (
                <Fragment>
                  <CardHeadline>Dein Gießfortschritt</CardHeadline>
                  <CardProgress data={wateredByUser} />
                  <CardAccordion
                    active={true}
                    title={<span>Adoptierte Bäume</span>}
                  >
                    {adoptedTreesDetails && (
                      //@ts-ignore
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

export default connect(
  state => ({
    treeLastWatered: state.treeLastWatered,
    state: state,
    userdata: state.user,
    wateredByUser: state.wateredByUser,
    adoptedTrees: state.adoptedTrees,
    adoptedTreesDetails: state.adoptedTreesDetails,
  }),
  Actions
)(SidebarProfile);
