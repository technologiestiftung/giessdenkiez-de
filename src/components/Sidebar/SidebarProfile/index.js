import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../../../utils/auth0';
import Actions from "../../../state/Actions";
import { connect } from "unistore/react";
import { litersSpendSelector } from '../../../state/Selectors';
import Store from '../../../state/Store';
import { fetchAPI, createAPIUrl } from '../../../state/utils';

import SidebarTitle from '../SidebarTitle/';
import Login from "../../Login";
import CardHeadline from '../../Card/CardHeadline/';
import CardParagraph from '../../Card/CardParagraph/';
import CardProgress from '../../Card/CardProgress/';

const SidebarProfile = p => {
  const { treeLastWatered, litersSpend, state, wateredByUser } = p;
  const { loading, user, isAuthenticated, getTokenSilently } = useAuth0();

  useEffect(() => {
    const fetch = async () => {
      if (isAuthenticated) {
        const token = await getTokenSilently();
        const urlWateredByUser = createAPIUrl(state, `/private/get-watered-trees-by-user?uuid=${user.sub}`);

        fetchAPI(urlWateredByUser, {
        headers: {
          Authorization: "Bearer " + token,
        }
        }).then((r) => {
          Store.setState({ wateredByUser: r.data });
        });
      }
    };
    fetch();
  }, [])

  return (
    <>
      <SidebarTitle>Profil</SidebarTitle>
      {!isAuthenticated && (
        <Fragment>
          <CardParagraph>Du bist momentan nicht eingeloggt. Wenn Sie das Gießen von Bäumen in ihrer Umgebung hier eintragen möchten, dann registrieren oder melden sie sich an.</CardParagraph>
        </Fragment>
      )}
      {isAuthenticated && wateredByUser && (
        <Fragment>
          <CardHeadline>Dein Gießfortschritt</CardHeadline>
          <CardProgress data={wateredByUser} />
        </Fragment>
      )}
      <Login />
    </>
  )
}

export default connect(
  (state) => ({
    treeLastWatered: state.treeLastWatered,
    state: state,
    wateredByUser: state.wateredByUser,
    litersSpend: litersSpendSelector(state)
  }),
  Actions
)(SidebarProfile);