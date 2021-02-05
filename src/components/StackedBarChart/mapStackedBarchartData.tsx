import {
  DailyWaterAmountsType,
  SelectedTreeType,
  WateredDayType,
} from '../../common/interfaces';
import { RadolanDays } from '../../common/types';

const _radolanDaysToHours = (radolanDays: RadolanDays): number[] => {
  let sumPerDay = 0;

  const hours: number[] = [];

  // aggregate hours to days
  radolanDays.forEach((hour, i) => {
    sumPerDay += hour;
    const fullDay = i % 24 === 23;
    if (fullDay) {
      const sum = sumPerDay;
      sumPerDay = 0;
      hours.push(sum);
    }
  });

  return hours.reverse();
};

const _createDateList = (len: number) => {
  const today = new Date();
  let iter = 1;
  const last30Dates: string[] = [];
  while (iter < 1 + len) {
    const priorDate = new Date().setDate(today.getDate() - iter);

    last30Dates.push(new Date(priorDate).toISOString().split('T')[0]);
    iter++;
  }
  return last30Dates;
};

const _createRadolanMap: (
  radolanDays: RadolanDays
) => { [key: string]: number } = radolanDays => {
  const rainOfMonth = _radolanDaysToHours(radolanDays);
  const last30Days = _createDateList(rainOfMonth.length);
  const map = {};
  rainOfMonth.forEach((ele, i) => {
    map[last30Days[i]] = ele;
  });
  return map;
};

const _timestamp2stringKey = (timestamp: string): string =>
  timestamp.split('T')[0];

const _createTreeLastWateredMap = (
  treeLastWatered: WateredDayType[]
): { [key: string]: number } =>
  treeLastWatered.reduce(
    (acc, currentDay) => ({
      ...acc,
      [_timestamp2stringKey(currentDay.timestamp)]: parseInt(
        currentDay.amount,
        10
      ),
    }),
    {}
  );

export function mapStackedBarchartData({
  treeLastWatered,
  selectedTree,
}: {
  treeLastWatered: WateredDayType[];
  selectedTree: SelectedTreeType;
}): DailyWaterAmountsType[] {
  const treeLastWateredMap = _createTreeLastWateredMap(treeLastWatered);
  const selectedTreeMap = _createRadolanMap(selectedTree.radolan_days);

  return Object.keys(selectedTreeMap).map(selectedTreeKey => {
    const dailyAmount = selectedTreeMap[selectedTreeKey];
    const timestamp = new Date(selectedTreeKey);

    return {
      id: `${timestamp.valueOf()}`,
      timestamp,
      rainValue: dailyAmount,
      wateringValue: treeLastWateredMap[selectedTreeKey] || 0,
    };
  });
}
