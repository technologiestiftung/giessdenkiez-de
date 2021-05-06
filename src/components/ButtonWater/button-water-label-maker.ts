import { ButtonWaterGroup } from '../../common/types';

export const buttonLabels: { label: string; amount: number }[] = [
  {
    label: '5l',
    amount: 5,
  },
  {
    label: '10l',
    amount: 10,
  },
  {
    label: '25l',
    amount: 25,
  },
  {
    label: '50l',
    amount: 50,
  },
];

export const getButtonLabel = (state: ButtonWaterGroup): string => {
  switch (state) {
    case 'visible':
      return 'Ich habe gegossen!';

    case 'watering':
      return 'Wieviel Wasser?';

    case 'watered':
      return 'Begießung wurde eingetragen.';

    default:
      throw new Error("Can only be one of 'visible', 'watering' or watered.");
  }
};
