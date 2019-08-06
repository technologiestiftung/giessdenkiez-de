import React from 'react';
import { connect } from "react-redux";

import DeckGlMap from './map/index';

const mapStateToProps = state => {
    return { articles: state.articles };
};

class AppContainer extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
        }
    }  

    render() {
        return (
            <div className="app-wrapper">
                <DeckGlMap/>
            </div>
        ) 
    }
}

export default connect(mapStateToProps)(AppContainer);