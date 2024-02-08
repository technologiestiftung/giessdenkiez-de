import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useActions, useStoreState } from '../../state/unistore-hooks';
import { PumpsColorLegend } from './PumpsColorLegend';
import { RainColorLegend } from './RainColorLegend';
import { TreesColorLegend } from './TreesColorLegend';
import {
  FlexColumn,
  FlexColumnLast,
  FlexRow,
  FlexRowFit,
  FlexSpace,
} from './LegendFlexBoxes';
import { ItemLabel } from './LegendLabels';
import SmallParagraph from '../SmallParagraph';
import { isMobile } from 'react-device-detect';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

export interface IsActiveProps {
  $isActive?: boolean;
}

const StyledItemLabel = styled(ItemLabel)`
  width: auto;
  padding: 0;
`;

const LegendDiv = styled.div<IsActiveProps>`
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
  ${props => (props.$isActive ? 'min-height: 180px;' : '')}
  padding: 8px 12px;
  width: ${p => (p.$isActive ? '210px' : '110px')};
  background: white;

  &:hover {
    cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  }
`;

const StyledCardDescription = styled(SmallParagraph)`
  font-weight: bold;
  font-size: 0.8rem;
  opacity: 1;
`;

const LegendToggle = styled.span<IsActiveProps>`
  cursor: pointer;
  height: fit-content;
  padding: 8px ${props => props.theme.spacingS};
  transition: background-color 200ms ease-out;
  &:hover {
    background-color: ${props =>
      props.$isActive ? props.theme.colorGreyLight : ''};
  }
`;

const LegendRadio = styled.span<{
  checked?: boolean;
}>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${({ checked }) => (checked ? 'black' : 'gray')};
  box-shadow: inset 0 0 0 3px white;
  background: ${({ checked }) => (checked ? 'black' : 'white')};
`;

const RadiosParent = styled.div`
  margin-top: 4px;
`;

const MapLayerLegend: FC = () => {
  const { setVisibleMapLayer } = useActions();

  const visibleMapLayer = useStoreState('visibleMapLayer');

  const [legendExpanded, setLegendExpanded] = useState(isMobile ? false : true);

  const content = useLocalizedContent();

  if (legendExpanded === false) {
    return (
      <LegendDiv onClick={() => setLegendExpanded(true)}>
        <FlexSpace>
          <FlexColumn>
            <StyledCardDescription>
              {content.legend.title}
            </StyledCardDescription>
          </FlexColumn>
          <LegendToggle>+</LegendToggle>
        </FlexSpace>
      </LegendDiv>
    );
  }

  return (
    <LegendDiv $isActive>
      <FlexSpace $isActive>
        <FlexColumnLast>
          <StyledCardDescription onClick={() => setLegendExpanded(false)}>
            {visibleMapLayer === 'pumps'
              ? content.legend.pumps
              : content.legend.precipitation}
          </StyledCardDescription>
          {visibleMapLayer !== 'pumps' && (
            <SmallParagraph>{content.legend.ofLastDays}</SmallParagraph>
          )}
        </FlexColumnLast>
        <LegendToggle $isActive onClick={() => setLegendExpanded(false)}>
          —
        </LegendToggle>
      </FlexSpace>
      {visibleMapLayer !== 'pumps' && (
        <FlexRow>
          {visibleMapLayer === 'trees' && <TreesColorLegend />}
          {visibleMapLayer === 'rain' && <RainColorLegend />}
        </FlexRow>
      )}
      {visibleMapLayer === 'pumps' && <PumpsColorLegend />}

      <FlexColumnLast $isLast={true}>
        <StyledCardDescription>
          {content.legend.dataPoints}
        </StyledCardDescription>
        <RadiosParent>
          <FlexRowFit
            $isActive={visibleMapLayer === 'trees'}
            onClick={() => {
              setVisibleMapLayer('trees');
            }}
          >
            <LegendRadio checked={visibleMapLayer === 'trees'} />
            <StyledItemLabel>{content.legend.treeLayer}</StyledItemLabel>
          </FlexRowFit>
          <FlexRowFit
            $isActive={visibleMapLayer === 'pumps'}
            onClick={() => {
              setVisibleMapLayer('pumps');
            }}
          >
            <LegendRadio checked={visibleMapLayer === 'pumps'} />
            <StyledItemLabel>{content.legend.pumps}</StyledItemLabel>
          </FlexRowFit>
          <FlexRowFit
            $isActive={visibleMapLayer === 'rain'}
            onClick={() => {
              setVisibleMapLayer('rain');
            }}
          >
            <LegendRadio checked={visibleMapLayer === 'rain'} />
            <StyledItemLabel>
              {content.legend.precipitationAreas}
            </StyledItemLabel>
          </FlexRowFit>
        </RadiosParent>
      </FlexColumnLast>
    </LegendDiv>
  );
};

export default MapLayerLegend;
