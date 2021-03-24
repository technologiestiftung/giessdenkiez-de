import {
  DailyWaterAmountsType,
  SelectedTreeType,
  WateringType,
} from '../../common/interfaces';
import { RadolanDays } from '../../common/types';

const radolanDaysToHours = (radolanDays: RadolanDays): number[] => {
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

const createDateList = (len: number) => {
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

const createRadolanMap: (
  radolanDays: RadolanDays
) => { [key: string]: number } = radolanDays => {
  const rainOfMonth = radolanDaysToHours(radolanDays);
  const last30Days = createDateList(rainOfMonth.length);
  const map = {};
  rainOfMonth.forEach((ele, i) => {
    map[last30Days[i]] = ele;
  });
  return map;
};

const timestamp2stringKey = (timestamp: string): string =>
  timestamp.split('T')[0];

const createTreeWateringsMap = (
  waterings: WateringType[]
): { [key: string]: WateringType['amount'] } =>
  waterings.reduce(
    (acc, watering) => ({
      ...acc,
      [timestamp2stringKey(watering.timestamp)]: watering.amount,
    }),
    {}
  );

export function mapStackedBarchartData(
  selectedTree: SelectedTreeType
): DailyWaterAmountsType[] {
  const treeWateringsMap = createTreeWateringsMap(selectedTree.waterings || []);
  const selectedTreeMap = createRadolanMap(selectedTree.radolan_days);

  return Object.keys(selectedTreeMap).map(selectedTreeKey => {
    const dailyAmount = selectedTreeMap[selectedTreeKey];
    const timestamp = new Date(selectedTreeKey);

    return {
      id: `${timestamp.valueOf()}`,
      timestamp,
      rainValue: dailyAmount,
      wateringValue: treeWateringsMap[selectedTreeKey] || 0,
    };
  });
}
