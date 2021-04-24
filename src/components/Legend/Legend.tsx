import React from 'react';
import styled from 'styled-components';
import { interpolateColor } from '../../utils';
import store from '../../state/Store';
// import { connect } from 'unistore/react';
// import Actions from '../../state/Actions';
import { useStoreState } from '../../state/unistore-hooks';
import CardDescription from '../Card/CardDescription';
import {
  workingColor,
  defaultColor,
  brokenColor,
  lockedColor,
} from '../map/colors';

interface StyledProps {
  active?: boolean;
}

interface FlexColumnProps {
  isLast?: boolean;
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
interface LegendDotProps {
  color: string;
  gradient?: string;
}
const LegendDot = styled.div<LegendDotProps>`
  width: 13px;
  height: 13px;
  border-radius: 100px;
  margin-right: 5px;
  ${p =>
    p.gradient ? `background: ${p.gradient}` : `background-color: ${p.color}`};
`;

interface PumpsDot {
  color: string;
  size: number;
}
const PumpsDot = styled.div<PumpsDot>`
  width: ${p => p.size - 2}px;
  height: ${p => p.size - 3}px;
  border-radius: ${p => p.size / 2}px;
  margin-right: 6px;
  background-color: ${p => p.color};
  border: 2px solid ${p => p.theme.colorTextDark};
`;

const PumpLabel = styled.label`
  font-size: ${p => p.theme.fontSizeL};
  opacity: 0.66;
  width: 100%;
`;

const LegendRect = styled.div<Pick<LegendDotProps, 'gradient'>>`
  width: 9px;
  height: 9px;
  margin-right: 5px;
  border: 2px solid ${p => p.theme.colorTextDark};
  ${p => (p.gradient ? `background: ${p.gradient}` : 'background-color: none')};
`;

const StrokedLegendDot = styled.div<Pick<LegendDotProps, 'gradient'>>`
  border-radius: 100px;
  margin-right: 5px;
  ${p => (p.gradient ? `background: ${p.gradient}` : 'background-color: none')};
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

const FlexRow = styled.div`
  display: flex;
  flex-direction: colmun;
  height: 16px;
  line-height: 16px;
  padding: 4px 9px;
  width: 100%;
  align-items: center;

  margin-right: 10px;
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
export interface LegendProps {
  treesVisible: boolean;
  rainVisible: boolean;
  waterSourcesVisible: boolean;
  legendExpanded: boolean;
}

function createCSSGradient(colors: string[], degrees = 90): string {
  let gradient = `linear-gradient(${degrees}deg, `;
  const len = colors.length;
  let i = 0;
  for (const color of colors) {
    gradient += color;
    if (i !== len - 1) {
      gradient += ', ';
    }
    i++;
  }
  gradient += ')';
  return gradient;
}
const rainColors = legendArray.map(item => interpolateColor(item.value));
const rainGradient = createCSSGradient(rainColors);

const Legend: React.FC = () => {
  const { legendExpanded } = useStoreState('legendExpanded');
  const { waterSourcesVisible } = useStoreState('waterSourcesVisible');
  const { rainVisible } = useStoreState('rainVisible');
  const { treesVisible } = useStoreState('treesVisible');

  return (
    <LegendDiv active={legendExpanded}>
      <FlexSpace active={legendExpanded}>
        <FlexColumn>
          <StyledCardDescription
            onClick={() => store.setState({ legendExpanded: !legendExpanded })}
          >
            {(() => {
              if (legendExpanded) {
                var labels = [];
                if (treesVisible || rainVisible) {
                  labels.push('Niederschlag');
                }
                if (waterSourcesVisible) {
                  labels.push('Wasserquellen');
                }
                return labels.length > 1 ? labels[0] + " / " + labels[1] : labels[0];
              } else {
                return 'Legende';
              }
            })()}
            {/* {legendExpanded ? 'Niederschlag' : 'Legende'} */}
          </StyledCardDescription>
          {legendExpanded === true && treesVisible && (
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
      {legendExpanded === true && (
        <UnstyledFlex>
          {/*
            // TODO: [GDK-8] Using i as key is not good. Might mess up the sort order
            // https://reactjs.org/docs/lists-and-keys.html#keys
          */}
          {treesVisible === true &&
            legendArray.map(item => {
              return (
                <React.Fragment key={item.label}>
                  <ItemContainer>
                    <LegendDot color={interpolateColor(item.value)} />
                    <ItemLabel>{item.label}</ItemLabel>
                  </ItemContainer>
                </React.Fragment>
              );
            })}

          {rainVisible === true &&
            legendArray.map(item => (
              <React.Fragment key={item.label}>
                <ItemContainer>
                  <LegendRect gradient={interpolateColor(item.value)} />
                  <ItemLabel>{item.label}</ItemLabel>
                </ItemContainer>
              </React.Fragment>
            ))}
        </UnstyledFlex>
      )}
      {legendExpanded && (
        <FlexColumn isLast={true}>
          <StyledCardDescription>Datenpunkte</StyledCardDescription>
          <StyledCardDescriptionSecond>
            durch Klick ein- & ausblenden.
          </StyledCardDescriptionSecond>
          <UnstyledFlexWidth
            active={treesVisible}
            onClick={() => {
              store.setState({ treesVisible: !treesVisible });
              store.setState({ rainVisible: false });
            }}
          >
            {treesVisible === true ? (
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
            active={waterSourcesVisible}
            onClick={() => {
              store.setState({ waterSourcesVisible: !waterSourcesVisible });
              store.setState({ rainVisible: false });
            }}
          >
            {waterSourcesVisible === true ? (
              <StrokedLegendDot gradient={`${"#0000ff"}`} />
            ) : (
              <StrokedLegendDot />
            )}
            <StyledItemLabel>Wasserquellen</StyledItemLabel>
            {waterSourcesVisible === true && (
              <div>kostenlose, öffentlich zugängliche Wasserquellen, damit weite 
                Wasser-Transportwege entfallen und möglichst geringe Wasserkosten 
                entstehen. Möchtest Du auch anderen Wasser zum Gießen bereitstellen, 
                melde Dich gerne bei <a href="mailto:wasserspende@leipziggiesst.de">uns</a>.
              </div>
            )}
          </UnstyledFlexWidth>          
          <UnstyledFlexWidth
            active={rainVisible}
            onClick={() => {
              store.setState({ treesVisible: false });
              store.setState({ waterSourcesVisible: false });
              store.setState({ rainVisible: !rainVisible });
            }}
          >
            {rainVisible === true ? (
              <LegendRect gradient={rainGradient} />
            ) : (
              <LegendRect />
            )}
            <StyledItemLabel>Niederschlagsflächen</StyledItemLabel>
          </UnstyledFlexWidth>
        </FlexColumn>
      )}
    </LegendDiv>
  );
};

// export default connect(
//   state => ({
//     treesVisible: state.treesVisible,
//     rainVisible: state.rainVisible,
//     legendExpanded: state.legendExpanded,
//     waterSourcesVisible: state.waterSourcesVisible,
//   }),
//   Actions
// )(Legend);

export default Legend;
