import React from 'react';
import { connect } from "react-redux";
import styled, { ThemeProvider } from 'styled-components';
import theme from '../assets/theme';
import axios from 'axios';

import DeckGlMap from './Map/';
import Sidebar from './Sidebar/';

const mapStateToProps = state => {
    return { selectedTree: state.selectedTree };
};

const AppWrapperDiv = styled.div`
    font-family: ${props => props.theme.fontFamily};
`;

import { setWateredTrees, setWateredTreesFetched } from '../store/actions/index';

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

    render() {
        return (
            <ThemeProvider theme={theme}>
                <AppWrapperDiv>
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