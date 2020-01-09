import createStore from 'unistore';

const Store = createStore({
  wateredTrees: {},
  includedTrees: {},
  data: null,
  isLoading: true,
  wateredTreesFetched: false,
  wateredTreeDataUpdated: false,
  hoveredObject: false
})

export default Store;