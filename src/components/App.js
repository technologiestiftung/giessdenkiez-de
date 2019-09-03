import React from 'react';
import { connect } from "react-redux";
import styled, { ThemeProvider } from 'styled-components';
import theme from '../assets/theme';
import axios from 'axios';

import DeckGlMap from './map/index.js';
import Sidebar from './Sidebar/index.js';

import Loading from './Loading/index.js';

import png from '../assets/citylab-logo.png';

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
    width: 160px;
`;

import { setWateredTrees, setWateredTreesFetched, setDataIncluded } from '../store/actions/index.js';

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
                this.createIncludedTreesObj(watered);
            })
            .catch(err => {
                console.log(err);
        })
    }

    dispatchSetDataIncluded(data) {
        this.props.dispatch(setDataIncluded(data))
        this.dispatchSetWateredTreesFetched(true);
    }

    createIncludedTreesObj(arr) {
        let obj = {};
        arr.forEach(id => {
            obj[id] = { included: true};
        })

        this.dispatchSetDataIncluded(obj);
    }

    componentDidMount() {
        this.getWateredTrees();
    }

    TSBLink() {
        if (this.props.dataLoaded && this.props.wateredTreesFetched) {
            return <TsbLinkDiv className="link">
                <a href="https://citylab-berlin.org">
                    <LogoImg src={png}></LogoImg>
                </a>
            </TsbLinkDiv>;
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <AppWrapperDiv>
                    <Loading show={this.props.dataLoaded && this.props.wateredTreesFetched}/>
                    <div>
                        {this.TSBLink()}
                        <Sidebar 
                            selectedTree={this.props.selectedTree}
                        />
                        <DeckGlMap/>
                    </div>
                </AppWrapperDiv>
            </ThemeProvider>
        ) 
    }
}

export default connect(mapStateToProps)(AppContainer);