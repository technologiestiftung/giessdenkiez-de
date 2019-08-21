import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import styled from 'styled-components';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios';

const KeyCodes = {
    comma: 188,
    enter: 13,
};
   
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const typesJson = require('../../../data/types.json');

import { setActiveTreeTypes } from '../../store/actions/index';

const mapStateToProps = state => {
    return { 
        activeTreeTypes: state.activeTreeTypes
    };
};

const ButtonWaterSpan = styled.span`
    padding: 6px;
    cursor: pointer;
    width: 70px;
    margin-left: 30px;
    background: ${props => props.theme.colorPrimary};
    transition: background ${props => props.theme.timeS} ease-in-out;
    border-radius: ${props => props.theme.borderRadiusS};
    text-align: center;
    
    &:hover {
        background: ${props => props.theme.colorPrimaryHover};
        transition: background ${props => props.theme.timeS} ease-in-out;
    }
`

const TagsDiv = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 3;
    height: auto;
    margin-top: 10px;
    padding: ${props => props.theme.spacingM};
    width: ${props => props.theme.sidebarTileWidth};
    border: 2px solid ${props => props.theme.colorGreyLight};
    border-radius: ${props => props.theme.borderRadiusM};
    margin-bottom: 20px;
`;

class Tags extends React.Component {

    constructor(props) {
        super(props);

        this.fetched = [];
    
        this.state = {
            suggestions: null
        };
        
        this.limit = 8000;
        this.fetched = [];

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.requestTypes = this.requestTypes.bind(this);

    }
    
    componentWillMount() {
        let arr = [];
        typesJson.types.forEach(type => {
            arr.push({ id: type, text: type })
        })

        this.setState( { suggestions: arr, tags: arr.slice(0,5) } );
    }

    componentDidUpdate() {
        console.log(this.props);
    }

    flatten(obj) {
        let arr = [];
        obj.tags.forEach(tag => {
            arr.push(tag.id);
        })
        return arr;
    }

    promiseGet(url) {

        console.log(url);
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(res => {
                    if (res.data.length > 1) {
                        this.fetched.push(res.data);
                    }
                    resolve(res.data);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
            })
        })
    }

    collectTrees(skip, limit, types) {
        let query = [];

        types.forEach((type,i) => {
            let part = `${i == 0 ? '?' : '&'}types=${type}`;
            query.push(part);
        });

        const all = query.join('');

        const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/types";
        const url = `${remote}${all}&skip=${skip}&limit=${limit}`;

        return this.promiseGet(url);
    }

    collectCountTrees(types) {
        let query = [];

        console.log(types);

        types.forEach((type,i) => {
            
            let part = `${i == 0 ? '?' : '&'}types=${type}`;
            query.push(part);
        });

        const all = query.join('');

        const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/types/count";
        const url = `${remote}${all}`;

        return this.promiseGet(url);
    }

    requestTypes() {
        let types = this.flatten(this.state);
        this.dispatchSetActiveTreeTypes(types);

        let promiseArr = [];
        let offset = 0;
        let iterator
        
        return new Promise((resolve, reject) => {

                // this.dispatchSetTreeAgeDataLoading(true);
                this.fetched = [];
                this.collectCountTrees(types)
                .then(data => {
                    iterator = Math.ceil(data / this.limit);
                    
                    for (let index = 0; index < iterator; index++) {
                        const offset = index == 0 ? 0 : index * this.limit;
                        promiseArr.push(this.collectTrees(offset, this.limit, types))
                    }
                    
                    Promise.all(promiseArr).then(data => {
                        this.fetched = this.fetched.flat();
                        // this.dispatchSetWateredTreeDataUpdated(false);
                        // this.dispatchSetTreeAgeDataUpdated(true);
                        // this.dispatchSetTreeAgeDataLoading(false);
                        // this.dispatchSetTreeAgeData(this.fetched);
                        // this.createIncludedTreesObj(this.fetched);
                        console.log(this.fetched);
                    }).catch(err => {
                        console.log(err)
                    });

                }).catch(reject);
        });
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }

    dispatchSetActiveTreeTypes(arr) {
        return new Promise((resolve, reject) => {
            this.props.dispatch(setActiveTreeTypes(arr));
            resolve(arr);
        }).catch(err => {
            console.log(err)
        });
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
    
    render() {
        const { tags, suggestions } = this.state;
        return (
            <TagsDiv className="tags">
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} 
                    />
                <ButtonWaterSpan onClick={this.requestTypes}>Filter</ButtonWaterSpan>
            </TagsDiv>
        )
    }
}

export default connect(mapStateToProps)(Tags);

