import styled from 'styled-components';
import { ItemContainerProps } from '../../common/interfaces';

export const ItemContainer = styled.div<ItemContainerProps>`
  display: flex;
  flex-direction: column;
  height: 40px;
  align-items: ${p => (p.active ? 'baseline' : 'center')};
  justify-content: center;
  margin-right: 10px;
`;
