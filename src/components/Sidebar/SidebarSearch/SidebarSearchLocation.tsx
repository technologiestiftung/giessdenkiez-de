import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, QueryFunction } from 'react-query';
import { useActions } from '../../../state/unistore-hooks';
import { FeatureType } from '../../../common/interfaces';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  height: auto;
  width: 100%;
  margin-bottom: 10px;
  background: white;
`;

const SearchInput = styled.input`
  outline: none;
  border-radius: 4px;
  padding: 8px;
  margin: 5px 0 10px 0;
  font-family: inherit;
  box-sizing: border-box;
  color: ${p => p.theme.colorTextDark};
  font-size: ${p => p.theme.fontSizeL};
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  transition: border 200ms ease-out, box-shadow 100ms ease-out;

  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.6);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const ResultsContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: block;
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
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:hover,
  &.even:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const fetchSearch: QueryFunction<FeatureType[]> = async ({ queryKey }) => {
  const [, value] = queryKey;

  if (typeof value !== 'string' || value.length < 3) return [];

  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?autocomplete=true&language=de&country=de&bbox=${process.env.NEXT_PUBLIC_MAP_BOUNDING_BOX}&access_token=${MAPBOX_TOKEN}`;
  const res = await fetch(geocodingUrl);

  if (!res.ok) return [];

  const json = (await res.json()) as { features: FeatureType[] };
  return json.features;
};

const SidebarSearchLocation: FC = () => {
  const { addressPlaceholder } = useLocalizedContent().sidebar;
  const [value, setValue] = useState('');
  const { setMapFocusPoint } = useActions();
  const { data: results } = useQuery(['sidebarSearch', value], fetchSearch, {
    staleTime: Infinity,
  });

  useEffect(
    () => () => {
      setMapFocusPoint(null);
    },
    [setMapFocusPoint]
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Wrapper>
      <SearchInput
        type='text'
        placeholder={addressPlaceholder}
        value={value}
        onChange={handleOnChange}
      />
      <ResultsContainer>
        {results &&
          results.map((item: FeatureType, index: number) => (
            <ResultElement
              className={index % 2 ? 'even' : 'odd'}
              key={item.id}
              onClick={() =>
                setMapFocusPoint({
                  id: item.id,
                  latitude: item.geometry.coordinates[1],
                  longitude: item.geometry.coordinates[0],
                  zoom: 18,
                })
              }
            >
              {item.place_name_de}
            </ResultElement>
          ))}
      </ResultsContainer>
    </Wrapper>
  );
};

export default SidebarSearchLocation;
