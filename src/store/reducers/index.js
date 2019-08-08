import { 
    ADD_ARTICLE, 
    SET_SIDEBAR,
    SET_SELECTED_TREE_DATA,
    SET_SELECTED_TREE_DATA_LOADING,
    SET_WATERED_TREES,
    SET_WATERED_TREES_FETCHED,
    SET_WATERING_TREE,
} from "../constants/action-types";

const initialState = {
  articles: [],
  sidebar: true,
  selectedTreeData: null,
  selectedTreeDataLoading: false,
  wateredTrees: null,
  wateredTreesFetched: false,
  wateringTree: false
};

function rootReducer(state = initialState, action) {

    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
        });
    }

    if (action.type === SET_SIDEBAR) {
        return {...state, sidebar: action.payload }
    }

    if (action.type === SET_SELECTED_TREE_DATA) {
        return {...state, selectedTreeData: action.payload }
    }

    if (action.type === SET_SELECTED_TREE_DATA_LOADING) {
        return {...state, selectedTreeDataLoading: action.payload }
    }

    if (action.type === SET_WATERED_TREES) {
        return {...state, wateredTrees: action.payload }
    }

    if (action.type === SET_WATERED_TREES_FETCHED) {
        return {...state, wateredTreesFetched: action.payload }
    }

    if (action.type === SET_WATERING_TREE) {
        return {...state, wateringTree: action.payload }
    }
    
    return state;
}

export default rootReducer;