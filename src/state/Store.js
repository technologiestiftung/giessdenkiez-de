import createStore from 'unistore';

const Store = createStore({
  wateredTrees: [],
  includedTrees: {},
  data: null,
  local: true,
  selectedTree: null,
  endpoints: {
    local: 'http://localhost:3000/',
    prod: 'https://tsb-tree-zeit-now-lambda.fabiandinklage.now.sh',
  },
  tabActive: 'id-0',
  selectedTree: false,
  selectedTreeState: false,
  isLoading: true,
  hoveredObject: false
})

export default Store;