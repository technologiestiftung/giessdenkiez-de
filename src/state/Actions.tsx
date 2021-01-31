import { StoreProps } from '../common/interfaces';

const setAgeRange = (
  ageRange: StoreProps['ageRange']
): Pick<StoreProps, 'ageRange'> => ({ ageRange });

const setVisibleMapLayer = (
  type: StoreProps['visibleMapLayer']
): Pick<StoreProps, 'visibleMapLayer'> => ({ visibleMapLayer: type });

const setMapViewFilter = (
  mapViewFilter: StoreProps['mapViewFilter']
): Pick<StoreProps, 'mapViewFilter'> => ({ mapViewFilter });

<<<<<<< HEAD
const setMapFocusPoint = (
  mapFocusPoint: StoreProps['mapFocusPoint']
): Pick<StoreProps, 'mapFocusPoint'> => ({ mapFocusPoint });
=======
    d3Dsv(',', dataUrl, { cache: 'force-cache' })
      .then(data => {
        const geojson = createGeojson(data);
        store.setState({ data: geojson, isTreeDataLoading: false });
        return;
      })
      .catch(console.error);
  }
};

export const setAgeRange = (_state, payload) => {
  return {
    ageRange: payload,
  };
};

export const loadCommunityData = (store: Store<StoreProps>) => () => {
  const fetchCommunityDataUrl = createAPIUrl(
    store.getState(),
    `/get?queryType=wateredandadopted`
  );
  requests(fetchCommunityDataUrl)
    .then(json => {
      const obj = {};
      const communityDataWatered: Generic[] = [];
      const communityDataAdopted: Generic[] = [];
      // TODO: Review https://eslint.org/docs/rules/array-callback-return
      // create community data object for map
      if (json.data) {
        json.data.map(item => {
          obj[item.tree_id] = {
            adopted: item.adopted > 0 ? true : false,
            watered: item.watered > 0 ? true : false,
          };
          if (item.adopted > 0) {
            communityDataWatered.push(item.tree_id);
          }
          if (item.watered > 0) {
            communityDataAdopted.push(item.tree_id);
          }
        });
        store.setState({ communityData: obj });
        store.setState({ communityDataAdopted });
        store.setState({ communityDataWatered });
      }
      return;
    })
    .catch(console.error);
};

export const loadData = (store: Store<StoreProps>) => async () => {
  try {
    store.setState({ isTreeDataLoading: true });
    // let geojson = [];

    const dataUrl =
      'https://trees-radolan-harvester-leipzig-dev.s3.eu-central-1.amazonaws.com/weather_light.geojson.gz';

    const rainGeojson = await requests(dataUrl);
    store.setState({ rainGeojson });
  } catch (error) {
    console.error(error);
  }
};

export const setAppState = (_state, payload) => {
  return {
    AppState: payload,
  };
};

export const setDataView = (_state, payload) => {
  return {
    dataView: payload,
  };
};

function setViewport(_state, payload) {
  return {
    viewport: {
      latitude: payload[0],
      longitude: payload[1],
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
}

function setView(_state, payload) {
  return {
    viewport: payload,
  };
}

export const getWateredTrees = Store => async () => {
  try {
    Store.setState({ isTreeDataLoading: true });
    const url = createAPIUrl(Store.getState(), '/get?queryType=watered');
    const result = await requests(url);

    if (result.data === undefined) {
      throw new Error('data is not defined on getWateredTrees');
    }
    return {
      wateredTrees: result.data.watered,
    };
  } catch (error) {
    console.error(error);
  }
};
>>>>>>> 9d076f3... show additional attributes, fix adopted / watered filter, remove pumps

const openOverlay = (): Pick<StoreProps, 'overlay' | 'isNavOpen'> => ({
  overlay: true,
  isNavOpen: false,
});

const closeOverlay = (): { overlay: StoreProps['overlay'] } => ({
  overlay: false,
});

const closeNav = (): { isNavOpen: StoreProps['isNavOpen'] } => ({
  isNavOpen: false,
});

const allActions = {
  setMapFocusPoint,
  setAgeRange,
  openOverlay,
  closeOverlay,
  closeNav,
  setVisibleMapLayer,
  setMapViewFilter,
};

export type ActionsType = typeof allActions;
export default allActions;
