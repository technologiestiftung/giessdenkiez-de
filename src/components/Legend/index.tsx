import React from 'react';
import styled from 'styled-components';
import { interpolateColor } from '../../utils/';
import store from '../../state/Store';
import { connect } from 'unistore/react';
import Actions from '../../state/Actions';

import CardDescription from '../Card/CardDescription/';

interface StyledProps {
  active?: boolean;
}

interface ItemContainerProps extends StyledProps {
  active?: boolean;
}
const ItemContainer = styled.div<ItemContainerProps>`
  display: flex;
  flex-direction: column;
  height: 40px;
  align-items: ${p => (p.active ? 'baseline' : 'center')};
  justify-content: center;
  margin-right: 10px;
`;

// const TileHeadline = styled.span`
//   opacity: 1;
//   font-size: 0.8rem;
//   font-weight: 600;
//   margin-bottom: 10px;
//   transform: translateX(-4px);
// `;

const LegendDot = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 100px;
  margin-right: 5px;
  background-color: ${p => p.color};
`;

const LegendRect = styled.div`
  width: 9px;
  height: 9px;
  margin-right: 5px;
  border: 2px solid ${p => p.theme.colorTextDark};
  background-color: none;
`;

const StrokedLegendDot = styled(LegendDot)`
  background: none;
  width: 10px;
  height: 10px;
  border: 2px solid ${p => p.theme.colorTextDark};
`;

const ItemLabel = styled.label`
  font-size: ${p => p.theme.fontSizeL};
  opacity: 0.66;
  padding-top: 5px;
  width: 100%;
`;

const StyledItemLabel = styled(ItemLabel)`
  width: auto;
  padding: 0;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
`;

const UnstyledFlex = styled(Flex)`
  border-bottom: none;
  justify-content: flex-start;
  margin-bottom: 0;
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

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
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

const legendArray = [
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

const StyledToggle = styled.span`
  cursor: pointer;
  height: fit-content;
  &:hover {
    opacity: 0.66;
  }
`;

const Legend = p => {
  const { treesVisible, rainVisible, pumpsVisible, legendExpanded } = p;
  return (
    <LegendDiv active={legendExpanded}>
      <FlexSpace active={legendExpanded}>
        <FlexColumn>
          <StyledCardDescription
            onClick={() => store.setState({ legendExpanded: !legendExpanded })}
          >
            {legendExpanded ? 'Niederschlag' : 'Legende'}
          </StyledCardDescription>
          {legendExpanded && (
            <StyledCardDescriptionSecond>
              der letzten 30 Tage (Liter)
            </StyledCardDescriptionSecond>
          )}
        </FlexColumn>
        <StyledToggle
          onClick={() => store.setState({ legendExpanded: !legendExpanded })}
        >
          {legendExpanded ? '—' : '+'}
        </StyledToggle>
      </FlexSpace>
      {legendExpanded && (
        <UnstyledFlex>
          {legendArray.map((item, i) => (
            <React.Fragment key={i}>
              <ItemContainer>
                <LegendDot color={interpolateColor(item.value)} />
                <ItemLabel>{item.label}</ItemLabel>
              </ItemContainer>
            </React.Fragment>
          ))}
        </UnstyledFlex>
      )}
      {legendExpanded && (
        <FlexColumn>
          <StyledCardDescription>Datenpunkte</StyledCardDescription>
          <StyledCardDescriptionSecond>
            durch Klick ein- & ausblenden.
          </StyledCardDescriptionSecond>
          <UnstyledFlexWidth
            active={treesVisible}
            onClick={() => {
              store.setState({ treesVisible: !treesVisible });
              store.setState({ pumpsVisible: false });
              store.setState({ rainVisible: false });
            }}
          >
            <LegendDot color={'#2c303b'} />
            <StyledItemLabel>Straßen- & Anlagenbäume</StyledItemLabel>
          </UnstyledFlexWidth>
          <UnstyledFlexWidth
            active={pumpsVisible}
            onClick={() => {
              store.setState({ treesVisible: false });
              store.setState({ pumpsVisible: !pumpsVisible });
              store.setState({ rainVisible: false });
            }}
          >
            <StrokedLegendDot />
            <StyledItemLabel>Öffentl. Pumpe</StyledItemLabel>
          </UnstyledFlexWidth>
          <UnstyledFlexWidth
            active={rainVisible}
            onClick={() => {
              store.setState({ treesVisible: false });
              store.setState({ pumpsVisible: false });
              store.setState({ rainVisible: !rainVisible });
            }}
          >
            <LegendRect />
            <StyledItemLabel>Niederschlagsflächen</StyledItemLabel>
          </UnstyledFlexWidth>
        </FlexColumn>
      )}
    </LegendDiv>
  );
};

export default connect(
  state => ({
    treesVisible: state.treesVisible,
    rainVisible: state.rainVisible,
    legendExpanded: state.legendExpanded,
    pumpsVisible: state.pumpsVisible,
  }),
  Actions
)(Legend);
