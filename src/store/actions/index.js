import { 
    ADD_ARTICLE,
    SET_SIDEBAR,
    SET_SELECTED_TREE_DATA,
    SET_SELECTED_TREE_DATA_LOADING,
    SET_WATERED_TREES,
    SET_WATERED_TREES_FETCHED,
    SET_WATERING_TREE,
    SET_DATA_LOADED,
    SET_TREE_AGE_DATA_LOADING,
    SET_TREE_AGE_DATA,
    SET_TREE_AGE_DATA_UPDATED,
    SET_WATERED_TREE_DATA_UPDATED,
    SET_DATA_INCLUDED,
    SET_TAB_ACTIVE,
    SET_ACTIVE_TREE_TYPES,
    SET_TREE_TYPE_DATA,
    SET_TREE_TYPE_DATA_LOADING,
    SET_TREE_TYPE_DATA_UPDATED,
    SET_TYPE_COLORS
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

export function setTreeAgeDataLoading(payload) {
    return { type: SET_TREE_AGE_DATA_LOADING, payload };
}

export function setTreeAgeData(payload) {
    return { type: SET_TREE_AGE_DATA, payload };
}

export function setWateredTreeDataUpdated(payload) {
    return { type: SET_WATERED_TREE_DATA_UPDATED, payload };
}

export function setTreeAgeDataUpdated(payload) {
    return { type: SET_TREE_AGE_DATA_UPDATED, payload };
}

export function setDataIncluded(payload) {
    return { type: SET_DATA_INCLUDED, payload };
}

export function setTabActive(payload) {
    return { type: SET_TAB_ACTIVE, payload };
}

export function setActiveTreeTypes(payload) {
    return { type: SET_ACTIVE_TREE_TYPES, payload };
}

export function setTreeTypeData(payload) {
    return { type: SET_TREE_TYPE_DATA, payload };
}

export function setTreeTypeDataLoading(payload) {
    return { type: SET_TREE_TYPE_DATA_LOADING, payload };
}

export function setTreeTypeDataUpdated(payload) {
    return { type: SET_TREE_TYPE_DATA_UPDATED, payload };
}

export function setTypeColors(payload) {
    return { type: SET_TYPE_COLORS, payload };
}