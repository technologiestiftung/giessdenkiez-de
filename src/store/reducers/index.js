import { 
    ADD_ARTICLE, 
    SET_SIDEBAR,
    SET_SELECTED_TREE_DATA,
    SET_SELECTED_TREE_DATA_LOADING,

} from "../constants/action-types";

const initialState = {
  articles: [],
  sidebar: true,
  selectedTreeData: null,
  selectedTreeDataLoading: false
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
    
    return state;
}

export default rootReducer;