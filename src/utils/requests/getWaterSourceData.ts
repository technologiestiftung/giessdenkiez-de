import { ExtendedFeature, ExtendedFeatureCollection, GeoGeometryObjects } from 'd3';
import { SelectedWaterSourceType } from '../../common/interfaces';


export const getWaterSourceData = async (
  id: string,
  waterSourcesGeoJson: ExtendedFeatureCollection<ExtendedFeature<GeoGeometryObjects | null, GeoJSON.GeoJsonProperties>> | null,
): Promise<{
  selectedWaterSourceData: SelectedWaterSourceType | undefined;
}> => {

  const feature = waterSourcesGeoJson?.features.find(feature => feature.properties?.id === id)

  if (!feature) {
    return {
      selectedWaterSourceData: undefined
    }
  }

  return {
    selectedWaterSourceData: {
      ...feature.properties,
      id: "" + feature?.properties?.id,
      latitude: (feature?.geometry as GeoJSON.Point)?.coordinates[1],
      longitude: (feature?.geometry as GeoJSON.Point)?.coordinates[0]
    }
  };
};
