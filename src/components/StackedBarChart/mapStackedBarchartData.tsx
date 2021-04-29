import {
  DailyWaterAmountsType,
  SelectedTreeType,
  WateringType,
} from '../../common/interfaces';

export const parseWaterings = (
  waterings: WateringType[] | undefined
): { [key: number]: number } => {
  const parsedWaterings = {};

  if (!waterings) return parsedWaterings;

  waterings.forEach(watering => {
    const { timestamp, amount } = watering;
    parsedWaterings[+new Date(timestamp.split('T')[0])] =
      parsedWaterings[+new Date(timestamp.split('T')[0])] + amount || amount;
  });

  return parsedWaterings;
};

export const mapStackedBarchartData = (
  selectedTree: SelectedTreeType,
  today: Date = new Date()
): DailyWaterAmountsType[] => {
  const date = new Date(today.toISOString().split('T')[0]);
  const waterings = parseWaterings(selectedTree.waterings);

  //reverse because last element is most recent rain
  const rainings = [...selectedTree.radolan_days].reverse();

  return new Array(30).fill(null).map((_, i) => {
    const timestamp = new Date(date);
    const id = +timestamp;
    const wateringValue = waterings[id] || 0;
    const rainValue = rainings
      /**
       * (i - 1) means the first .slice(-24, 0) => returns [] => .reduce() => 0
       * We do this because the raining values are always delayed by one day
       * meaning we have to add the current day and set the rain to 0
       */
      .slice(24 * (i - 1), 24 * i)
      .reduce((a, b) => a + b, 0);

    date.setDate(date.getDate() - 1);
    return { id, timestamp, rainValue, wateringValue };
  });
};
