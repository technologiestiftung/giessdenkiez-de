import React, { FC, ReactNode } from 'react';

import { DeckGL } from '@deck.gl/react';
import { _MapContext as MapContext, StaticMap } from 'react-map-gl';
import { ContextProviderValue } from '@deck.gl/core/lib/deck';

import MapControls from './mapControls';

import { ViewState, OnViewStateChange, Feature, Layer } from 'src/types';

const defaultMapboxApiAccessToken = process.env.REACT_APP_API_KEY;

const defaultMapStyle =
  'mapbox://styles/technologiestiftung/ckke3kyr00w5w17mytksdr3ro';

interface MapProps {
  legend?: ReactNode;
  pumpHover?: ReactNode;
  mapboxApiAccessToken?: string;
  mapStyle?: string;
  viewState: ViewState;
  onViewStateChange: OnViewStateChange;
  layers: Layer<Feature>[];
}

const NewMap: FC<MapProps> = ({
  legend = null,
  pumpHover = null,
  mapboxApiAccessToken = defaultMapboxApiAccessToken,
  mapStyle = defaultMapStyle,
  viewState,
  onViewStateChange,
  layers,
}: MapProps) => {
  return (
    <>
      {pumpHover}
      <DeckGL
        viewState={viewState}
        onViewStateChange={onViewStateChange}
        controller={true}
        layers={layers}
        ContextProvider={
          (MapContext.Provider as unknown) as React.Provider<ContextProviderValue>
        }
      >
        <StaticMap
          mapboxApiAccessToken={mapboxApiAccessToken}
          mapStyle={mapStyle}
          //NOTE: Not sure what this does
          // preventStyleDiffing={true}
          onLoad={e => console.log(e)}
        ></StaticMap>
        <MapControls onViewStateChange={onViewStateChange} />
        {legend}
      </DeckGL>
    </>
  );
  // }
};
export default NewMap;
