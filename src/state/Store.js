import createStore from 'unistore';

const Store = createStore({
  wateredTrees: [],
  includedTrees: {},
  adoptedTrees: [],
  data: null,
  local: false,
  selectedTree: null,
  endpoints: {
    local: 'http://localhost:3000/',
    prod: 'https://trees-express-now.fabiandinklage.now.sh',
  },
  tabActive: 'id-0',
  selectedTree: false,
  selectedTreeState: false,
  isLoading: true,
  hoveredObject: false
})

export default Store;