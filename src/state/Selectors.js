import { createSelector } from 'reselect';

export const wateredTreesResponse = state => state.wateredTrees;
export const wateredTreesStatusSelector = state => state;

export const wateredTreesSelector = createSelector(
  [wateredTreesResponse],
  data => {
    if (data.length > 0) {
      let obj = {};
      data.forEach(id => {
          obj[id] = { included: true};
      })
      return obj;
    } else {
      return null
    }

  }
)

export default {
  wateredTreesSelector
}