import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../../../utils/auth0';
import Actions from '../../../state/Actions';
import { connect } from 'unistore/react';
import { litersSpendSelector } from '../../../state/Selectors';
import Store from '../../../state/Store';
import { fetchAPI, createAPIUrl } from '../../../utils';

import SidebarTitle from '../SidebarTitle/';
import Login from '../../Login';
import CardHeadline from '../../Card/CardHeadline/';
import CardParagraph from '../../Card/CardParagraph/';
import CardProgress from '../../Card/CardProgress/';
import CardAccordion from '../../Card/CardAccordion/';
import CardCredentials from '../../Card/CardCredentials/';
import TreesAdopted from '../../Card/CardAccordion/TreesAdopted';
import { NonVerfiedMailCardParagraph } from '../../Card/non-verified-mail';

const SidebarProfile = p => {
  const {
    treeLastWatered,
    litersSpend,
    state,
    wateredByUser,
    adoptedTrees,
    adoptedTreesDetails,
  } = p;
  const { loading, user, isAuthenticated, getTokenSilently } = useAuth0();
  const [isEmailVerifiyed, setIsEmailVerifiyed] = useState(false);
  useEffect(() => {
    if (!user) return;
    console.log(user);
    setIsEmailVerifiyed(user.email_verified);
  }, [user, setIsEmailVerifiyed]);
  useEffect(() => {
    const fetch = async () => {
      if (isAuthenticated) {
        const token = await getTokenSilently();
        const urlWateredByUser = createAPIUrl(
          state,
          `/private/get-watered-trees-by-user?uuid=${user.sub}`
        );
        const urlAdoptedTrees = createAPIUrl(
          state,
          `/private/get-adopted-trees?uuid=${user.sub}`
        );

        fetchAPI(urlWateredByUser, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }).then(r => {
          Store.setState({ wateredByUser: r.data });
        });

        fetchAPI(urlAdoptedTrees, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }).then(r => {
          Store.setState({ adoptedTrees: r.data });
        });
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (isAuthenticated && adoptedTrees) {
        const token = await getTokenSilently();
        const concatReducer = (acc, curr, currentIndex, array) => {
          if (currentIndex + 1 == array.length) {
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
        }).then(r => {
          Store.setState({ adoptedTreesDetails: r.data });
        });
      }
    };
    if (adoptedTrees.length === 0) {
      Store.setState({ adoptedTreesDetails: [] });
    } else {
      fetch();
    }
  }, [adoptedTrees]);

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
      <SidebarTitle>Profil</SidebarTitle>
      {/* If the user is not authenticated give him the notice */}
      {!isAuthenticated ? (
        <Fragment>
          <CardParagraph>
            Du bist momentan nicht eingeloggt. Wenn du das Gießen von Bäumen in
            deiner Umgebung hier eintragen möchtest, dann registriere dich oder
            logge dich ein.
          </CardParagraph>
          <Login width="-webkit-fill-available" />
        </Fragment>
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
                    title={<span>Abonnierte Bäume</span>}
                  >
                    {adoptedTreesDetails && (
                      <TreesAdopted data={adoptedTreesDetails} />
                    )}
                  </CardAccordion>
                  <CardCredentials
                    email={user.email}
                    username={user.nickname}
                  />
                  <Login width="-webkit-fill-available" />
                </Fragment>
              )}
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
    wateredByUser: state.wateredByUser,
    adoptedTrees: state.adoptedTrees,
    adoptedTreesDetails: state.adoptedTreesDetails,
  }),
  Actions
)(SidebarProfile);
