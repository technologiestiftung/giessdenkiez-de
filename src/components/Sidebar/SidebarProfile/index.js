import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "../../../utils/auth0";
import Actions from "../../../state/Actions";
import { connect } from "unistore/react";
import { litersSpendSelector } from "../../../state/Selectors";
import Store from "../../../state/Store";
import { fetchAPI, createAPIUrl } from "../../../state/utils";

import SidebarTitle from "../SidebarTitle/";
import Login from "../../Login";
import CardHeadline from "../../Card/CardHeadline/";
import CardParagraph from "../../Card/CardParagraph/";
import CardProgress from "../../Card/CardProgress/";
import CardAccordion from "../../Card/CardAccordion/";
import TreesAdopted from "../../Card/CardAccordion/TreesAdopted";

const SidebarProfile = (p) => {
  const {
    treeLastWatered,
    litersSpend,
    state,
    wateredByUser,
    adoptedTrees,
    adoptedTreesDetails,
  } = p;
  const { loading, user, isAuthenticated, getTokenSilently } = useAuth0();

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
            Authorization: "Bearer " + token,
          },
        }).then((r) => {
          Store.setState({ wateredByUser: r.data });
        });

        fetchAPI(urlAdoptedTrees, {
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then((r) => {
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
        const str = "";
        const concatReducer = (acc, curr, currentIndex, array) => {
          if (currentIndex + 1 == array.length) {
          return acc + curr + '}'
          } else {
            return acc + curr + ','
          }
        };
        const queryStr = adoptedTrees.reduce(concatReducer, '{');

        const urlAdoptedTreesDetails = createAPIUrl(
          state,
          `/private/get-adopted-trees-details?tree_ids=${queryStr}`
        );

        fetchAPI(urlAdoptedTreesDetails, {
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then((r) => {
          Store.setState({ adoptedTreesDetails: r.data });
        });
      }
    }
    fetch();
  }, [adoptedTrees]);

  return (
    <>
      <SidebarTitle>Profil</SidebarTitle>
      {!isAuthenticated && (
        <Fragment>
          <CardParagraph>
            Du bist momentan nicht eingeloggt. Wenn Sie das Gießen von Bäumen in
            ihrer Umgebung hier eintragen möchten, dann registrieren oder melden
            sie sich an.
          </CardParagraph>
        </Fragment>
      )}
      {isAuthenticated && !wateredByUser && (
        <Fragment>Lade Profil ...</Fragment>
      )}
      {isAuthenticated && wateredByUser && adoptedTreesDetails && (
        <Fragment>
          <CardHeadline>Dein Gießfortschritt</CardHeadline>
          <CardProgress data={wateredByUser} />
          <CardAccordion title={<span>Zuletzt gegossen</span>}>
            <TreesAdopted data={adoptedTreesDetails} />
          </CardAccordion>
        </Fragment>
      )}
      <Login width="-webkit-fill-available" />
    </>
  );
};

export default connect(
  (state) => ({
    treeLastWatered: state.treeLastWatered,
    state: state,
    wateredByUser: state.wateredByUser,
    adoptedTrees: state.adoptedTrees,
    adoptedTreesDetails: state.adoptedTreesDetails,
  }),
  Actions
)(SidebarProfile);
