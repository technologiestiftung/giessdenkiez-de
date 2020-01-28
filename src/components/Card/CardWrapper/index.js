import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 3;
    height: auto;
    margin-top: 10px;
    width: 280px;
    padding: 10px;
    border-radius: ${props => props.theme.borderRadiusS};
    background: white;
    box-shadow: 0px 2px 3px 0px rgba(44,48,59,0.1);
`;

export default CardWrapper;