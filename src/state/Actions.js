import axios from 'axios';
import { assign, set } from 'lodash';
import { STATI, createIncludedTrees } from '../utils';

export const WATERED_TREES_LOADING = (state, { datum }) => {
  const defaultStatus = {
    data: false,
    status: STATI.STATUS_IDLE,
    message: '',
    lastFetched: new Date()
  }

  const newStatus = assign(defaultStatus, { datum })
  const newStatusInState = assign({}, state.wateredTrees, newStatus)

  return {
    wateredTrees: newStatusInState
  }

}

export const SELECTED_TREE_LOADING = (state, { datum }) => {
  const defaultStatus = {
    data: false,
    status: STATI.STATUS_IDLE,
    message: '',
    lastFetched: new Date()
  }

  const newStatus = assign(defaultStatus, { datum })
  const newStatusInState = assign({}, state.wateredTrees, newStatus)

  return {
    selectedTree: newStatusInState
  }

}

export const setHoveredObject = (state, hoveredObject) => ({hoveredObject})

export const setDataLoaded = (state, dataLoaded) => ({dataLoaded})

export const setWateredTreesFetched = (state, wateredTreesFetched) => ({wateredTreesFetched});

export const setWateredTreeDataUpdated = (state, wateredTreeDataUpdated) => ({wateredTreeDataUpdated})

export const setWateredTrees = (Store) => async (state) => {
  const url = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";

  Store.setState(WATERED_TREES_LOADING(state, { datum: { status: STATI.STATUS_LOADING } } ));

  const wateredTrees = await axios.get(url)
  .then(res => {
    let data = [];
    res.data.forEach(tree => {
        data.push(tree['_id']);
    })
    Store.setState(WATERED_TREES_LOADING(state, { datum: { status: STATI.STATUS_SUCCESS,  data: data} } ));

    const includedTrees = createIncludedTrees(data);
    Store.setState({ includedTrees: includedTrees })
  })
  .catch(err => {
    Store.setState(WATERED_TREES_LOADING(state, { datum: { status: STATI.STATUS_ERROR,  message: err} } ));
    console.log(err);
  })
}

export const requestDB = (Store) => async (state, x, y, obj) => {
  const id = obj.properties.id;
  const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";

  Store.setState(SELECTED_TREE_LOADING(state, { datum: { status: STATI.STATUS_LOADING } }));

  const selectedTree = await axios.get(url)
    .then(res => {
      let data = [];
      res.data.forEach(tree => {
        Store.setState({
          hoveredObject: obj,
          selectedTreeData: res
        });
        Store.setState(SELECTED_TREE_LOADING(state, { datum: { status: STATI.STATUS_SUCCESS,  data: data} }));
      })
      .catch(err => {
        Store.setState(SELECTED_TREE_LOADING(state, { datum: { status: STATI.STATUS_ERROR,  message: err} }));
      })
    })
}

// _requestDb(x, y, obj) {
//     const id = obj.properties.id;
//     const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";
//     const local = "http://localhost:3000/trees"
//     const url = `${remote}/${id}`;

//     this.dispatchSetSelectedTreeDataLoading(true);
//     console.log('selected tree loading', this.props.selectedTreeDataLoading);

//     axios.get(url)
//     .then(res => {
//         this.setState({x, y, hoveredObject: res});
//         this.dispatchSetSelectedTreeData(res);
//         this.dispatchSetSelectedTreeDataLoading(false);
//         console.log(this.props.selectedTreeDataLoading);
//             // this._setTooltip(res, obj.object.x, obj.object.y)
//         })
//         .catch(err => {
//         console.log(err);
//     })
// }

// getWateredTrees() {
//     const url = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";

//     axios.get(url)
//     .then(res => {
//             let watered = [];
//             res.data.forEach(tree => {
//                 watered.push(tree['_id']);
//             })
//             this.dispatchSetWateredTrees(watered);
//             this.createIncludedTreesObj(watered);
//         })
//         .catch(err => {
//             console.log(err);
//     })
// }

export default Store => ({
  setWateredTrees: setWateredTrees(Store),
  setDataLoaded,
  setWateredTreesFetched,
  setWateredTreeDataUpdated,
  requestDB: requestDB(Store)
})