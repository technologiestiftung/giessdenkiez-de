import { GeoJsonLayer, GeoJsonLayerProps } from '@deck.gl/layers';
import { scaleLinear, interpolateViridis, easeCubic as d3EaseCubic } from 'd3';
import { FlyToInterpolator } from 'react-map-gl';

import {
  FeatureCollection,
  Feature,
  TreeFeature,
  PumpFeature,
  RainFeature,
  OnViewStateChange,
  SetSelectedTree,
  SetHoveredPump,
  CommunityData,
  Layer,
  WhichLayer,
  AgeRange,
} from 'src/types';

import { pumpColors, getRainColor } from './colors';

const transitionViewState = (feature: Feature, isMobile: boolean) => {
  return {
    viewState: {
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
      zoom: 19,
      maxZoom: 19,
      transitionDuration: 2000,
      transitionEasing: d3EaseCubic,
      transitionInterpolator: new FlyToInterpolator(),
      minZoom: isMobile ? 11 : 9,
      pitch: isMobile ? 0 : 45,
      bearing: 0,
    },
  };
};

interface GetTreeLayerProps {
  showTrees: boolean;
  showWatered: boolean;
  showAdopted: boolean;
  trees: FeatureCollection;
  communityData: CommunityData;
  selectedTree: string;
  setSelectedTree: SetSelectedTree;
  onViewStateChange: OnViewStateChange;
  isMobile: boolean;
  ageRange: AgeRange;
}

export const getTreeLayer = ({
  showTrees,
  showWatered,
  showAdopted,
  trees,
  communityData,
  selectedTree,
  setSelectedTree,
  onViewStateChange,
  isMobile,
  ageRange,
}: GetTreeLayerProps): GeoJsonLayer<
  TreeFeature,
  GeoJsonLayerProps<TreeFeature>
> => {
  return new GeoJsonLayer({
    id: 'tree',
    data: trees.features as TreeFeature[],
    //Properties
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    //Visibility
    visible: showTrees || showWatered || showAdopted,
    opacity: 1,
    //Fill
    /**
     * Tree Color is based on rain amounts
     * radolan_sum is an aggregated number of rain recieved
     */
    getFillColor: tree => {
      const { radolan_sum, id, age } = tree.properties;
      if (showTrees && ageRange[0] <= age && age <= ageRange[1])
        return getRainColor(radolan_sum);
      else if (showWatered && communityData[id] && communityData[id].watered)
        return [53, 117, 177, 200];
      else if (showAdopted && communityData[id] && communityData[id].adopted)
        return [0, 128, 128, 200];
      else return [0, 0, 0, 0];
    },
    getRadius: 3,
    pointRadiusMinPixels: 0.5,
    //Stroke
    getLineColor: tree => {
      if (selectedTree && tree.properties.id == selectedTree)
        return [247, 105, 6, 255];
      else return [0, 0, 0, 0];
    },
    getLineWidth: tree => {
      if (selectedTree && tree.properties.id == selectedTree) return 1;
      else return 0;
    },
    //Hover
    autoHighlight: true,
    highlightColor: [200, 200, 200, 255],
    //Actions
    onClick: ({ object: tree }) => {
      setSelectedTree(tree.properties.id);
      onViewStateChange(transitionViewState(tree, isMobile));
    },
    //On what change to update
    updateTriggers: {
      getLineWidth: [selectedTree],
      getLineColor: [selectedTree],
      getFillColor: [showTrees, showWatered, showAdopted],
    },
  });
};

export const getPumpLayer = (
  showPumps: boolean,
  pumps: FeatureCollection,
  setHoveredPump: SetHoveredPump
): Layer<PumpFeature> => {
  return new GeoJsonLayer({
    id: 'pumps',
    data: pumps.features as PumpFeature[],
    //Properties
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    //Visibility
    visible: showPumps,
    opacity: 1,
    //Fill
    getFillColor: pump => {
      return pumpColors[pump.properties['pump:status']].rgba;
    },
    getRadius: 9,
    pointRadiusMinPixels: 4,
    //Stroke
    getLineColor: [0, 0, 0, 200],
    getLineWidth: 3,
    lineWidthMinPixels: 1.5,
    //Hover
    onHover: ({ picked, x, y, object }) => {
      console.log('Pump Hover');
      if (picked)
        setHoveredPump({
          pointer: [x, y],
          message: object.properties['pump:status'],
        });
      else setHoveredPump(null);
    },
  });
};

export const getRainLayer = (
  showRain: boolean,
  rain: FeatureCollection
): Layer<RainFeature> => {
  return new GeoJsonLayer({
    id: 'rain',
    data: rain.features as RainFeature[],
    //Properties
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    //Visibility
    visible: showRain,
    opacity: 0.95,
    getElevation: 1,
    /**
     * Apparently DWD 1 is not 1ml but 0.1ml
     * We could change this in the database, but this would mean,
     * transferring 625.000 "," characters, therefore,
     * changing it client-side makes more sense.
     */
    getFillColor: rain => getRainColor(rain.properties.data[0] / 10),
    getRadius: 9,
    pointRadiusMinPixels: 4,
    //Stroke
    getLineColor: [0, 0, 0, 200],
    getLineWidth: 3,
    lineWidthMinPixels: 1.5,
  });
};

interface GetLayersProps {
  isMobile: boolean;

  onViewStateChange: OnViewStateChange;

  whichLayer: WhichLayer;

  data: {
    trees: FeatureCollection;
    pumps: FeatureCollection;
    rain: FeatureCollection;
    communityData: CommunityData;
  };

  selectedTree: string;
  setSelectedTree: SetSelectedTree;

  setHoveredPump: SetHoveredPump;

  ageRange: AgeRange;
}

export const getLayers = ({
  isMobile,
  onViewStateChange,
  whichLayer: { showTrees, showWatered, showAdopted, showPumps, showRain },
  data: { trees, pumps, rain, communityData },
  selectedTree,
  setSelectedTree,
  setHoveredPump,
  ageRange,
}: GetLayersProps): Layer<Feature>[] => {
  const layers = [
    getTreeLayer({
      showTrees,
      showWatered,
      showAdopted,
      trees,
      communityData,
      selectedTree,
      setSelectedTree,
      onViewStateChange,
      isMobile,
      ageRange,
    }),
    getPumpLayer(showPumps, pumps, setHoveredPump),
    getRainLayer(showRain, rain),
  ];

  return layers;
};
