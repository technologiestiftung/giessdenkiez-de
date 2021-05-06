import { RawWateringType, WateringType } from '../../common/interfaces';

const parseRawWatering = (rawWatering: RawWateringType): WateringType => ({
  id: `watering-${rawWatering.id}`,
  amount: parseFloat(rawWatering.amount),
  timestamp: rawWatering.timestamp,
  treeId: rawWatering.tree_id,
  username: rawWatering.username,
});

export const parseRawWaterings = (
  rawWaterings: RawWateringType[]
): WateringType[] => rawWaterings.map(parseRawWatering).reverse();
