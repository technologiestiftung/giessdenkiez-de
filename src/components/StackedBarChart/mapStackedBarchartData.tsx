import { scaleTime } from 'd3';
import {
  DailyWaterAmountsType,
  SelectedTreeType,
  WateringType,
} from '../../common/interfaces';

interface ParsedWateringType extends WateringType {
  date: Date;
}

export const parseWaterings = (
  waterings: WateringType[] | undefined,
  [today, thirtyDaysAgo]: [Date, Date]
): { [key: number]: number } => {
  const parsedWaterings = {};

  if (!waterings) return parsedWaterings;

  return waterings.reduce((acc, d) => {
    const newD = { ...d } as ParsedWateringType;
    newD.date = new Date(newD.timestamp);
    newD.date.setHours(0, 0, 0, 0);
    if (
      newD.date.getTime() < thirtyDaysAgo.getTime() ||
      newD.date.getTime() > today.getTime()
    )
      return acc;
    const id = newD.date.getTime();
    acc[id] = (acc[id] || 0) + newD.amount;
    return acc;
  }, {});
};

export const mapStackedBarchartData = (
  selectedTree: SelectedTreeType,
  today: Date = new Date(),
  thirtyDaysAgo: Date = new Date()
): DailyWaterAmountsType[] => {
  const xScale = scaleTime().domain([today, thirtyDaysAgo]).nice();
  const waterings = parseWaterings(
    selectedTree.waterings,
    xScale.domain() as [Date, Date]
  );

  //reverse because last element is most recent rain
  const rainings = [...selectedTree.radolan_days].reverse();

  return xScale.ticks(30).map((d, i) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    const id = date.getTime();
    const wateringValue = waterings[id] || 0;
    const rainValue = rainings
      /**
       * (i - 1) means the first .slice(-24, 0) => returns [] => .reduce() => 0
       * We do this because the raining values are always delayed by one day
       * meaning we have to add the current day and set the rain to 0
       */
      .slice(24 * (i - 1), 24 * i)
      .reduce((a, b) => a + b, 0);

    return { id, timestamp: d, rainValue, wateringValue };
  });
};
