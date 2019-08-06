import { 
    ADD_ARTICLE,
    SET_SIDEBAR,
    SET_SELECTED_TREE_DATA,
    SET_SELECTED_TREE_DATA_LOADING,
} from "../constants/action-types";

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload };
}

export function setSidebar(payload) {
    return { type: SET_SIDEBAR, payload };
}

export function setSelectedTreeData(payload) {
    return { type: SET_SELECTED_TREE_DATA, payload };
}

export function setSelectedTreeDataLoading(payload) {
    return { type: SET_SELECTED_TREE_DATA_LOADING, payload };
}