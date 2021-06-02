import React, { FC } from 'react';
import styled from 'styled-components';

import ExpandablePanel from '../../ExpandablePanel';
import { SelectedWaterSourceType } from '../../../common/interfaces';

const Wrapper = styled.div`
  z-index: 3;
  margin: 0 0 20px;
`;

const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SublineSpan = styled.span`
  margin-bottom: 0.75rem;
  text-transform: capitalize;
`;

const WaterSourceTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-top: 0px;
  line-height: 125%;
  margin-bottom: 5px;
  button {
    padding-bottom: 15px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding: 12px 0;
  font-weight: bold;
`;

const InfoValue = styled.span`
  font-weight: normal;
`;

const WaterSourceInfos: FC<{
  selectedWaterSourceData: SelectedWaterSourceType;
}> = ({ selectedWaterSourceData }) => {
  const {
    id,
    name,
    organisation,
    type,
    created,
    address,
    hints,
    images,
    url,
  } = selectedWaterSourceData;

  return (
    <Wrapper>
      <FlexColumnDiv>
        {name && (
          <WaterSourceTitle>{name}</WaterSourceTitle>
        )}
        {type && (
          <SublineSpan>{type}</SublineSpan>
        )}
        {organisation && organisation !== name && (
          <InfoContainer>
            <span>Organisation</span>
            <InfoValue>{organisation}</InfoValue>
          </InfoContainer>
        )}
        {address && (
          <InfoContainer>
            <span>Adresse</span>
            <InfoValue>{address}</InfoValue>
          </InfoContainer>
        )}
        {created && (
          <InfoContainer>
            <span>Erfasst am</span>
            <InfoValue>{created}</InfoValue>
          </InfoContainer>
        )}
        {hints && Array.isArray(hints) && hints.length > 0 && (
          <ExpandablePanel title={"Hinweise"} isExpanded={true}>
            <ul>
              { hints.map( hint => (
                <li>{hint}</li>
              ))}
            </ul>
          </ExpandablePanel>
        )}
        {url && (
          <InfoContainer>
            <span>Weitere Informationen</span>
            <InfoValue><a href={url}>Link</a></InfoValue>
          </InfoContainer>
        )}
        {images && Array.isArray(images) && images.length > 0 && (
          <ExpandablePanel title={"Fotos"} isExpanded={true}>
              { images.map( image => (
                <span>
                  {<img src={`/images/pumps/${id}/${image}`} alt={image} width={"100%"} />}
                </span>
              ))}
          </ExpandablePanel>
        )}
      </FlexColumnDiv>
    </Wrapper>
  );
};

export default WaterSourceInfos;
