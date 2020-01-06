import createStore from 'unistore';

const Store = createStore({
  wateredTrees: {},
  includedTrees: {},
  dataLoaded: false,
  wateredTreesFetched: false,
  wateredTreeDataUpdated: false,
  hoveredObject: false
})

export default Store;