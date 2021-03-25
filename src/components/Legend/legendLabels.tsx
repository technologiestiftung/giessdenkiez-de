import styled from 'styled-components';

export const legendLabels = [
  {
    label: '0',
    value: 0,
  },
  {
    label: '60',
    value: 60,
  },
  {
    label: '120',
    value: 120,
  },
  {
    label: '180',
    value: 180,
  },
  {
    label: '240',
    value: 240,
  },
  {
    label: '300',
    value: 300,
  },
];

export const ItemLabel = styled.label`
  font-size: ${p => p.theme.fontSizeL};
  opacity: 0.66;
  padding-top: 5px;
  width: 100%;
`;

export const PumpLabel = styled.label`
  font-size: ${p => p.theme.fontSizeL};
  opacity: 0.66;
  width: 100%;
`;
