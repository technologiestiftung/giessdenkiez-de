import { createSelector } from 'reselect';

export const wateredTreesSelector = state => state.wateredTrees.datum.data;
export const wateredTreesStatusSelector = state => state;

export const includedTreesSelector = state => createSelector(
  [wateredTreesSelector],
  data => {
    let obj = {};
    data.forEach(id => {
        obj[id] = { included: true};
    })
    return obj;
  }
)

export const wateredTreesLoadedSelector = state => createSelector(
  [wateredTreesSelector],
  (wateredTrees) => {
    return [wateredTrees, 'test']
  }
)