import React, { Fragment, useState } from "react";
import { connect } from "unistore/react";
import { render } from "react-dom";
import styled from "styled-components";
import axios from "axios";
import Store from "../../state/Store";
import Actions from "../../state/Actions";
import content from "../../assets/content";
import { fetchAPI, createAPIUrl } from "../../utils";
import { useAuth0 } from "../../utils/auth0";

import history from "../../../history";

import Login from "../Login";
import ButtonRound from "../ButtonRound";

import ButtonWaterGroup from "./BtnWaterGroup";
import CardDescription from "../Card/CardDescription/";

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledCardDescription = styled(CardDescription)`
  text-decoration: underline;
  padding-top: 6px;
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
    transition: all 0.125s ease-in-out;
  }
`;

const StyledLogin = styled(Login)`
  cursor: pointer;
  align-self: stretch;
`;

const ButtonWaterSpan = styled.span`
  padding: 10px;
  cursor: pointer;
  background: ${(props) => props.theme.colorPrimary};
  transition: background ${(props) => props.theme.timeS} ease-in-out;
  border-radius: ${(props) => props.theme.borderRadiusS};
  text-align: center;
  font-size: 13px;

  &:hover {
    background: ${(props) => props.theme.colorPrimaryHover};
    transition: background ${(props) => props.theme.timeS} ease-in-out;
  }
`;

const ButtonWaterSpanOther = styled.span`
  padding: 10px;
  color: ${(props) => props.theme.colorTextLight};
  background: ${(props) => props.theme.colorLightGrey};
  transition: background ${(props) => props.theme.timeS} ease-in-out;
  border-radius: ${(props) => props.theme.borderRadiusS};
  text-align: center;
  font-size: 13px;
`;

const ButtonWater = (p) => {
  const { selectedTree, state, toggleOverlay } = p;
  const { id } = selectedTree;
  const [waterGroup, setWaterGroup] = useState("visible");
  const { loading, user, isAuthenticated, getTokenSilently } = useAuth0();
  let adopted = false;

  if (user) {
    if (selectedTree.adopted == user.email) {
      adopted = true;
    }

    if (selectedTree.adopted) {
      if (
        selectedTree.adopted != user.email &&
        selectedTree.adopted.length > 0
      ) {
        adopted = "other";
      }
    }
  }

  const btnLabel = (state) => {
    switch (state) {
      case "visible":
        return "Ich habe gewässert!";
        break;
      case "watering":
        return "Wieviel Wasser hat der Baum erhalten?";
        break;
      case "watered":
        return "Bewässerung wurde eingetragen!";
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    history.push("/");
    toggleOverlay(true);
  };

  const waterHandler = () => {
    setWaterGroup("watering");
  };

  const setWaterAmount = (id, amount) => {
    createUser(user);
    setWaterGroup("watered");
    waterTree(id, amount);
    setTimeout(() => {
      setWaterGroup("visible");
    }, 1000);
  };

  const timeNow = () => {
    const date = +new Date();
    return date;
  };

  const createUser = async (user) => {
    const token = await getTokenSilently();
    const url = createAPIUrl(
      state,
      `/private/create-user?mail=${user.email}&uuid=${user.sub}`
    );
  };

  const waterTree = async (id, amount) => {
    Store.setState({ selectedTreeState: "WATERING" });
    const token = await getTokenSilently();
    const time = timeNow();
    const url = createAPIUrl(
      state,
      `/private/water-tree?id=${id}&time=${time}&uuid=${user.sub}&amount=${amount}`
    );

    const res = await fetchAPI(url, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((r) => {
        const url = createAPIUrl(state, `/get-tree?id=${id}`);
        const res = fetchAPI(url).then((r) => {
          Store.setState({
            selectedTreeState: "WATERED",
            selectedTree: r.data,
          });
        });
      })
      .then((r) => {
        const url = createAPIUrl(state, `/get-watered-trees`);
        const res = fetchAPI(url).then((r) => {
          Store.setState({ wateredTrees: r.data.watered });
        });
      });
  };

  const adoptTree = async (id) => {
    Store.setState({ selectedTreeState: "ADOPT" });
    const token = await getTokenSilently();
    const time = timeNow();
    const url = createAPIUrl(
      state,
      `/private/adopt-tree?tree_id=${id}&uuid=${user.sub}`
    );

    const res = await fetchAPI(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((r) => {
      const url = createAPIUrl(state, `/get-tree?id=${id}`);
      const res = fetchAPI(url).then((r) => {
        Store.setState({ selectedTreeState: "WATERED", selectedTree: r.data });
      });
    });
  };

  if (isAuthenticated) {
    return (
      <Fragment>
        {adopted && adopted === "other" && (
          <BtnContainer>
            <ButtonRound
              width="-webkit-fill-available"
              toggle={() => setWaterGroup("watering")}
              type="primary"
            >
              {btnLabel(waterGroup)}
            </ButtonRound>
            {waterGroup === "watering" && (
              <ButtonWaterGroup id={id} toggle={setWaterAmount} />
            )}
            <StyledCardDescription onClick={() => handleClick()}>
              Wie kann ich mitmachen?
            </StyledCardDescription>
          </BtnContainer>
        )}
        {adopted && adopted !== "other" && (
          <BtnContainer>
            <ButtonRound
              width="-webkit-fill-available"
              toggle={() => setWaterGroup("watering")}
              type="primary"
            >
              {btnLabel(waterGroup)}
            </ButtonRound>
            {waterGroup === "watering" && (
              <ButtonWaterGroup id={id} toggle={setWaterAmount} />
            )}
            <StyledCardDescription onClick={() => handleClick()}>
              Wie kann ich mitmachen?
            </StyledCardDescription>
          </BtnContainer>
        )}
        {!adopted && (
          <BtnContainer>
            <ButtonRound
              width="-webkit-fill-available"
              margin="15px"
              toggle={() => adoptTree(id)}
              type="secondary"
            >
              Baum abonnieren
            </ButtonRound>
            <ButtonRound
              width="-webkit-fill-available"
              toggle={() => setWaterGroup("watering")}
              type="primary"
            >
              {btnLabel(waterGroup)}
            </ButtonRound>
            {waterGroup === "watering" && (
              <ButtonWaterGroup id={id} toggle={setWaterAmount} />
            )}
            <StyledCardDescription onClick={() => handleClick()}>
              Wie kann ich mitmachen?
            </StyledCardDescription>
          </BtnContainer>
        )}
      </Fragment>
    );
  } else if (!isAuthenticated) {
    return (
      <BtnContainer>
        <StyledLogin width="-webkit-fill-available" />
        <StyledCardDescription onClick={() => handleClick()}>
          Wie kann ich mitmachen?
        </StyledCardDescription>
      </BtnContainer>
    );
  }
};

export default connect(
  (state) => ({
    selectedTree: state.selectedTree,
    state: state,
  }),
  Actions
)(ButtonWater);
