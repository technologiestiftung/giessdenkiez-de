import React, {Component} from 'react';
import styled from 'styled-components';

const TileHeadline = styled.span`
    opacity: 1;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    transform: translateX(-4px);
`;

const LegendDiv = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 3;
    font-size: 12px;
    height: auto;
    padding: ${props => props.theme.spacingM};
    width: ${props => props.theme.sidebarTileWidth};
    border: 2px solid ${props => props.theme.colorGreyLight};
    border-radius: ${props => props.theme.borderRadiusM};
    margin-bottom: 20px;

    div { 
        display: flex;
        flex-direction: row;

        &:first-of-type {
            div {
                background: rgb(102, 245, 173);
                opacity: 1;
            }
        }

        &:last-of-type {
            div {
                background: rgb(164, 181, 222);
                opacity: 1;
            }
        }

        div {
            
            width: 12px;
            transform: translateY(2px);
            margin-right: 10px;
            height: 12px;
            border-radius: 100px;
            background:red;
            opacity: 1;
        }
    }
`

const Legend = () => {
    return <LegendDiv>
        <TileHeadline>Legende</TileHeadline>
        <div>
            <div></div>
            Bewässert
        </div>
        <div>
            <div></div>
            Nicht bewässert
        </div>
    </LegendDiv>
}

export default Legend;