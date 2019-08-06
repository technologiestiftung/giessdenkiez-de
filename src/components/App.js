import React from 'react';
import { connect } from "react-redux";
import styled, { ThemeProvider } from 'styled-components';
import theme from '../assets/theme';

import DeckGlMap from './Map/index';
import Sidebar from './Sidebar/index';

const mapStateToProps = state => {
    return { selectedTree: state.selectedTree };
};

const AppWrapperDiv = styled.div`
    font-family: ${props => props.theme.fontFamily};
`;

import "../assets/style.scss";

class AppContainer extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
        }
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