import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { interpolateColor } from '../../utils/colorUtil';
import store from '../../state/Store';
import { useStoreState } from '../../state/unistore-hooks';
import CardDescription from '../Card/CardDescription';
import { workingColor } from '../map/colors';
import { createCSSGradient } from './createCSSGradient';
import { legendLabels } from './legendLabels';
import { PumpsColorLegend } from './PumpsColorLegend';
import { RainColorLegend } from './RainColorLegend';
import { TreesColorLegend } from './TreesColorLegend';
import { UnstyledFlex } from './UnstyledFlex';
import { ItemLabel } from './ItemLabel';
import { LegendRect } from './LegendRect';
import {
  FlexColumnProps,
  LegendDotProps,
  StyledProps,
} from '../../common/interfaces';

export const LegendDot = styled.div<LegendDotProps>`
  width: 13px;
  height: 13px;
  border-radius: 100px;
  margin-right: 5px;
  ${p =>
    p.gradient ? `background: ${p.gradient}` : `background-color: ${p.color}`};
`;

const StrokedLegendDot = styled.div<Pick<LegendDotProps, 'gradient'>>`
  border-radius: 100px;
  margin-right: 5px;
  ${p => (p.gradient ? `background: ${p.gradient}` : 'background-color: none')};
  width: 10px;
  height: 10px;
  border: 2px solid ${p => p.theme.colorTextDark};
`;

const StyledItemLabel = styled(ItemLabel)`
  width: auto;
  padding: 0;
`;

const UnstyledFlexWidth = styled(UnstyledFlex)<StyledProps>`
  border-bottom: none;
  width: fit-content;
  margin-right: 10px;
  margin-bottom: 0;
  padding: 6px 9px;
  margin-bottom: 2px;
  cursor: pointer;
  border-radius: 100px;
  background: ${p => (p.active ? p.theme.colorTextMedium : 'white')};
  transition: all 0.125s ease-in-out;

  &:hover {
    background: ${p =>
      p.active ? p.theme.colorGreyLight : p.theme.colorTextMedium};
    transition: all 0.125s ease-in-out;
  }
`;

const FlexSpace = styled.div<StyledProps>`
  display: flex;
  flex-direction: row;
  align-items: ${p => (p.active ? 'baseline' : 'center')};
  justify-content: space-between;
`;

const FlexColumn = styled.div<FlexColumnProps>`
  display: flex;
  flex-direction: column;
  ${props => (props.isLast === true ? 'margin-top:auto;' : '')}
`;

const LegendDiv = styled.div<StyledProps>`
  position: absolute;
  bottom: 36px;
  right: 12px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  margin: 0 auto;
  font-size: 12px;
  box-shadow: ${p => p.theme.boxShadow};
  height: min-content;
  ${props => (props.active ? 'min-height: 230px;' : '')}
  padding: 12px;
  width: ${p => (p.active ? '210px' : '90px')};
  background: white;
`;

const StyledCardDescription = styled(CardDescription)`
  font-weight: bold;
  font-size: 0.8rem;
  opacity: 1;
`;

const StyledCardDescriptionSecond = styled(CardDescription)`
  margin-bottom: 5px;
  line-height: 130%;
  width: 100%;
`;

const StyledToggle = styled.span`
  cursor: pointer;
  height: fit-content;
  &:hover {
    opacity: 0.66;
  }
`;

const rainColors = legendLabels.map(item => interpolateColor(item.value));
const rainGradient = createCSSGradient(rainColors);

const Legend: FC = () => {
  const visibleLayer = useStoreState('visibleLayer');

  const [legendExpanded, setLegendExpanded] = useState<boolean>(true);

  if (legendExpanded === false) {
    return (
      <LegendDiv>
        <FlexSpace>
          <FlexColumn>
            <StyledCardDescription onClick={() => setLegendExpanded(true)}>
              {'Legende'}
            </StyledCardDescription>
          </FlexColumn>
          <StyledToggle onClick={() => setLegendExpanded(true)}>
            {'+'}
          </StyledToggle>
        </FlexSpace>
      </LegendDiv>
    );
  }

  return (
    <LegendDiv active>
      <FlexSpace active>
        <FlexColumn>
          <StyledCardDescription onClick={() => setLegendExpanded(false)}>
            {visibleLayer === 'pumps' ? 'Öffentliche Pumpen' : 'Niederschlag'}
          </StyledCardDescription>
          {visibleLayer !== 'pumps' && (
            <StyledCardDescriptionSecond>
              der letzten 30 Tage (Liter)
            </StyledCardDescriptionSecond>
          )}
        </FlexColumn>
        <StyledToggle onClick={() => setLegendExpanded(false)}>
          {'—'}
        </StyledToggle>
      </FlexSpace>
      {visibleLayer !== 'pumps' && (
        <UnstyledFlex>
          {visibleLayer === 'trees' && <TreesColorLegend />}
          {visibleLayer === 'rain' && <RainColorLegend />}
        </UnstyledFlex>
      )}
      {visibleLayer === 'pumps' && <PumpsColorLegend />}

      <FlexColumn isLast={true}>
        <StyledCardDescription>Datenpunkte</StyledCardDescription>
        <StyledCardDescriptionSecond>
          durch Klick ein- & ausblenden.
        </StyledCardDescriptionSecond>
        <UnstyledFlexWidth
          active={visibleLayer === 'trees' ? true : false}
          onClick={() => {
            store.setState({ visibleLayer: 'trees' });
          }}
        >
          {visibleLayer === 'trees' ? (
            <LegendDot
              className={'legend-dot'}
              color={'#2c303b'}
              gradient={rainGradient}
            />
          ) : (
            <LegendDot className={'legend-dot'} color={'#2c303b'} />
          )}
          <StyledItemLabel>Straßen- & Anlagenbäume</StyledItemLabel>
        </UnstyledFlexWidth>
        <UnstyledFlexWidth
          active={visibleLayer === 'pumps' ? true : false}
          onClick={() => {
            store.setState({ visibleLayer: 'pumps' });
          }}
        >
          {visibleLayer === 'pumps' ? (
            <StrokedLegendDot gradient={`${workingColor.hex}`} />
          ) : (
            <StrokedLegendDot />
          )}
          <StyledItemLabel>Öffentl. Pumpen</StyledItemLabel>
        </UnstyledFlexWidth>
        <UnstyledFlexWidth
          active={visibleLayer === 'rain' ? true : false}
          onClick={() => {
            store.setState({ visibleLayer: 'rain' });
          }}
        >
          {visibleLayer === 'rain' ? (
            <LegendRect gradient={rainGradient} />
          ) : (
            <LegendRect />
          )}
          <StyledItemLabel>Niederschlagsflächen</StyledItemLabel>
        </UnstyledFlexWidth>
      </FlexColumn>
    </LegendDiv>
  );
};

export default Legend;
