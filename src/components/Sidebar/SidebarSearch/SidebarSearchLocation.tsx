import React from 'react';
import styled from 'styled-components';
import { useQuery, QueryFunction } from 'react-query';

import { useActions } from '../../../state/unistore-hooks';

interface FeatureType {
  id: string;
  place_name_de: string;
  geometry: {
    coordinates: [number, number];
  };
}

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
  input {
    outline: none;
    width: 100%;
    border-radius: 5px;
    padding: 5px 10px;
    border: 1px solid rgba(0, 0, 0, 0.75);
    margin: 5px 0 10px 0;
  }
`;

const ResultDiv = styled.div`
  display: flex;
  flex-direction: row;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: block;
  }
`;

const ResultElement = styled.li`
  list-style: none;
  display: block;
  width: 100%;
  margin: 0;
  padding: 10px;
  font-size: 0.8rem;
  cursor: pointer;
  box-sizing: border-box;
  &.even {
    background-color: rgba(217, 217, 217, 1);
  }
  &:hover,
  &.even:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const MAPBOX_TOKEN = process.env.API_KEY;

const fetchSearch: QueryFunction<FeatureType[]> = async ({ queryKey }) => {
  const [_key, { value }] = queryKey;

  if (value.length < 3) return [];

  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?autocomplete=true&language=de&country=de&bbox=13.0824446341071,52.3281202651866,13.7682544186827,52.681600197973&access_token=${MAPBOX_TOKEN}`;
  const res = await fetch(geocodingUrl);

  if (!res.ok) return [];

  const json = await res.json();
  return json.features;
};

const SidebarSearchLocation: React.FC = () => {
  const { selectTree } = useActions();
  const [value, setValue] = React.useState('');
  const { data: results } = useQuery(
    ['sidebarSearch', { value }],
    fetchSearch,
    {
      cacheTime: 1000,
      staleTime: 5000,
    }
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <SearchDiv>
      <FlexRowDiv>
        <input
          type='text'
          placeholder='Adresse'
          value={value}
          onChange={handleOnChange}
        />
      </FlexRowDiv>
      <ResultDiv>
        <ul>
          {results &&
            results.map((item: FeatureType, index: number) => (
              <ResultElement
                className={index % 2 ? 'even' : 'odd'}
                key={item.id}
                onClick={() =>
                  selectTree({
                    selectedTree: {
                      id: item.id,
                      lat: `${item.geometry.coordinates[0]}`,
                      lng: `${item.geometry.coordinates[1]}`,
                      radolan_days: [],
                      radolan_sum: 0,
                    },
                    treeLastWatered: [],
                  })
                }
              >
                {item.place_name_de}
              </ResultElement>
            ))}
        </ul>
      </ResultDiv>
    </SearchDiv>
  );
};

export default SidebarSearchLocation;
