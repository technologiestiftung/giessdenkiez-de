import createStore from 'unistore';

const Store = createStore({
  wateredTrees: [],
  includedTrees: {},
  data: null,
  local: true,
  endpoints: {
    local: 'http://localhost:3000/',
    prod: 'https://tsb-tree-zeit-now-lambda.fabiandinklage.now.sh',
  },
  tabActive: 'id-0',
  isLoading: true,
  wateredTreesFetched: false,
  wateredTreeDataUpdated: false,
  hoveredObject: false
})

export default Store;