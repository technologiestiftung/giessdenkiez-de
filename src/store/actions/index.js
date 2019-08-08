import { 
    ADD_ARTICLE,
    SET_SIDEBAR,
    SET_SELECTED_TREE_DATA,
    SET_SELECTED_TREE_DATA_LOADING,
    SET_WATERED_TREES,
    SET_WATERED_TREES_FETCHED,
    SET_WATERING_TREE,
    SET_DATA_LOADED,
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

export function setWateredTrees(payload) {
    return { type: SET_WATERED_TREES, payload };
}

export function setWateringTree(payload) {
    return { type: SET_WATERING_TREE, payload };
}

export function setWateredTreesFetched(payload) {
    return { type: SET_WATERED_TREES_FETCHED, payload };
}

export function setDataLoaded(payload) {
    return { type: SET_DATA_LOADED, payload };
}