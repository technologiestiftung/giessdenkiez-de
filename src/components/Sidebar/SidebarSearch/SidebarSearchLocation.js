import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Actions from '../../../state/Actions';

import { connect } from 'unistore/react';

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  height: auto;
  width: 100%;
  margin-bottom: 10px;
  background: white;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  input{
    outline:none;
    width:100%;
    border-radius:5px;
    padding:5px 10px;
    border: 1px solid rgba(0,0,0,0.75);
    margin:5px 0 10px 0;
  }
`;

const ResultDiv = styled.div`
  display: flex;
  flex-direction: row;
  ul {
    list-style:none;
    margin:0;
    padding:0;
    width:100%;
    display:block;
  }
`;

const ResultElement = styled.li`
  list-style:none;
  display:block;
  width:100%;
  margin:0;
  padding: 10px;
  font-size: .8rem;
  cursor: pointer;
  box-sizing:border-box;
  &.even{
    background-color:rgba(217,217,217,1);
  }
  &:hover, &.even:hover {
    background-color:rgba(0,0,0,0.25);
  }
`;

const MAPBOX_TOKEN = process.env.API_KEY;

const SidebarSearchLocation = p => {
  const { setViewport } = p

  const [value, setValue] = React.useState('');
  const [results, setResults] = React.useState([]);

  const updateSearch = (e) => {
    setValue(e.target.value);

    if (e.target.value.length >= 3) {
      const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?autocomplete=true&language=de&country=de&bbox=13.0824446341071,52.3281202651866,13.7682544186827,52.681600197973&access_token=${MAPBOX_TOKEN}`;
      fetch(geocodingUrl)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setResults(result.features);
        })
        .catch(console.error);
    }
  }

  return (
    <SearchDiv>
      <FlexRowDiv>
        <input 
          type="text"
          placeholder="Adresse"
          value={value}
          onChange={updateSearch}
        />
      </FlexRowDiv>
      <ResultDiv>
        <ul>
          {results.map((item, index) => (
            <ResultElement className={(index%2 ? 'even':'odd')} key={index} onClick={(e) => setViewport(item.geometry.coordinates)}>
              {item.place_name_de}
            </ResultElement>
          ))}
        </ul>
      </ResultDiv>
    </SearchDiv>
  );
};

export default connect(
  state => ({
    isLoading: state.isLoading
  }),
  Actions
)(SidebarSearchLocation);
