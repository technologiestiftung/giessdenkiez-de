import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Actions from '../../../state/Actions';

import { connect } from 'unistore/react';

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  height: auto;
  padding: 0 0 5px 5px;
  width: 100%;
  margin-bottom: 10px;
  background: white;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 30px;
`;

const ResultDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 30px;
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
        {results.map((item, index) => (
          <li key={index} onClick={(e) => setViewport(item.geometry.coordinates)}>
            {item.place_name_de}
          </li>
        ))}
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
