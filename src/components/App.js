import React from 'react';
import { connect } from "react-redux";
import styled, { ThemeProvider } from 'styled-components';
import theme from '../assets/theme';
import axios from 'axios';

import DeckGlMap from './map/index.js';
import Sidebar from './Sidebar/index.js';

const mapStateToProps = state => {
    return { 
        selectedTree: state.selectedTree,
        wateredTreesFetched: state.wateredTreesFetched,
        dataLoaded: state.dataLoaded,
    };
};

const AppWrapperDiv = styled.div`
    font-family: ${props => props.theme.fontFamily};
`;

const TsbLinkDiv = styled.div`
    position: absolute;
    z-index: 1;
    top: 30px;
    left: 30px;

    a {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: black;
        font-weight: bold;
    }
`;

const LogoImg = styled.img`
    margin-top: 10px;
    width: 100px;
`;

import { setWateredTrees, setWateredTreesFetched } from '../store/actions/index.js';

import "../assets/style.scss";

class AppContainer extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
        }

        this.getWateredTrees = this.getWateredTrees.bind(this);
    }

    dispatchSetWateredTrees(val) {
        this.props.dispatch(setWateredTrees(val));
    }

    dispatchSetWateredTreesFetched(val) {
        this.props.dispatch(setWateredTreesFetched(val));
    }

    getWateredTrees() {
        const url = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";
        
        axios.get(url)
        .then(res => {
                let watered = [];
                res.data.forEach(tree => {
                    watered.push(tree['_id']);
                })
                this.dispatchSetWateredTrees(watered);
                this.dispatchSetWateredTreesFetched(true);
            })
            .catch(err => {
                console.log(err);
        })
    }

    componentDidMount() {
        this.getWateredTrees();
    }


    TSBLink() {
        const svg = require('../assets/tsb-logo-content-vertical.svg');

        if (this.props.dataLoaded && this.props.wateredTreesFetched) {
            return <TsbLinkDiv className="link">
                <a href="https://technologiestiftung-berlin.de">
                    Ein Projekt der:
                    <LogoImg src={svg}></LogoImg>
                </a>
            </TsbLinkDiv>;
        }

    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <AppWrapperDiv>
                    {this.TSBLink()}
                    <Sidebar 
                        selectedTree={this.props.selectedTree}
                    />
                    <DeckGlMap/>
                </AppWrapperDiv>
            </ThemeProvider>
        ) 
    }
}

export default connect(mapStateToProps)(AppContainer);