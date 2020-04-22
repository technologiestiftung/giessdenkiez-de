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

import { 
    interpolatePlasma as d3InterpolatePlasma,
    interpolateRainbow as d3InterpolateRainbow,
    selectAll as d3SelectAll
} from 'd3';
   
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const typesJson = require('../../../data/types.json');

import { setColorsShuffled, setWateredTreeDataUpdated, setTypeColors, setActiveTreeTypes,  setTreeTypeDataLoading, setTreeTypeData, setTreeTypeDataUpdated,  setTreeAgeDataUpdated, setDataIncluded } from '../../store/actions/index';

const mapStateToProps = state => {
    return { 
        activeTreeTypes: state.activeTreeTypes,
        treeTypeDataLoading: state.treeTypeDataLoading,
        typeColors: state.typeColors,
        wateredTreeDataUpdated: state.wateredTreeDataUpdated,
        colorsShuffled: state.colorsShuffled
    };
};

const FilterLoadingDiv = styled.div`
    display: flex;
    flex-direction: row;
    z-index: 3;
    height: auto;
    margin-top: 10px;
    padding: ${props => props.theme.spacingM};
    width: ${props => props.theme.sidebarTileWidth};
    border-radius: ${props => props.theme.borderRadiusS};
    margin-bottom: 10px;
    background: white;
    box-shadow: 0px 2px 3px 0px rgba(44,48,59,0.1);
`

const Spinner = styled.div`
    width: 15px;
    height: 15px;
    transform: translateY(3px);
    margin-right: 10px;

    position: relative;
    float: left;

    .double-bounce1, .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #37DE8A;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        
        -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
        animation: sk-bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-bounce {
        0%, 100% { -webkit-transform: scale(0.0) }
        50% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bounce {
        0%, 100% { 
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        } 50% { 
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
    }
`


const TileHeadline = styled.span`
    opacity: 1;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const ButtonWaterSpan = styled.span`
    padding: 6px;
    cursor: pointer;
    width: 70px;
    margin-top: 10px;
    background: ${props => props.theme.colorPrimary};
    transition: background ${props => props.theme.timeS} ease-in-out;
    border-radius: ${props => props.theme.borderRadiusS};
    text-align: center;
    font-size: ${props => props.theme.fontSizeL};

    
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
    border-radius: ${props => props.theme.borderRadiusS};
    margin-bottom: 10px;
    background: white;
    box-shadow: 0px 2px 3px 0px rgba(44,48,59,0.1);
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
        this.setIds = this.setIds.bind(this);
    }
    
    componentWillMount() {
        let arr = [];
        typesJson.types.forEach((type,i) => {
            arr.push({ id: type, text: type.toLowerCase(), identifier: `identifier-${i}` })
        })

        if (!this.props.colorsShuffled) {
            this.setTypeColors();
        }


        this.setState( { suggestions: arr, tags: arr.slice(10, 16) } );
    }

    componentDidMount() {
        this.setIds();
    }

    subStrAfterChars(str, char, pos) {
      if(pos=='b')
       return str.substring(str.indexOf(char) + 1);
      else if(pos=='a') 
       return str.substring(0, str.indexOf(char));
      else
      return str;  
    }

    setIds() {
        const that = this;
        setTimeout(() => {
            d3SelectAll('span.ReactTags__tag')
                .attr('id', function() {
                    let label = that.subStrAfterChars(this.innerHTML, '<','a').toUpperCase();
                    return that.props.typeColors[label].id;
                })
        },100)
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevState.tags.length != this.state.tags.length) {
            this.setIds()
        }

        this.setIds();
    }

    flatten(obj) {
        let arr = [];
        obj.tags.forEach(tag => {
            arr.push(tag.id);
        })
        return arr;
    }

    promiseGet(url) {
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

    dispatchSetTreeTypeData(data) {
        this.props.dispatch(setTreeTypeData(data))
    }

    dispatchSetTreeAgeDataUpdated(data) {
        this.props.dispatch(setTreeAgeDataUpdated(data))
    }

    dispatchSetWateredTreeDataUpdated(data) {
        this.props.dispatch(setWateredTreeDataUpdated(data))
    }

    dispatchSetTreeTypeDataLoading(data) {
        this.props.dispatch(setTreeTypeDataLoading(data))
    }

    dispatchSetTreeTypeDataUpdated(data) {
        this.props.dispatch(setTreeTypeDataUpdated(data))
    }

    dispatchSetColorsShuffled(state) {
        this.props.dispatch(setColorsShuffled(state))
    }


    hexToRgbA(hex){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            // return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
            return JSON.parse(`[${[(c>>16)&255, (c>>8)&255, c&255]}, 220]`);
        }
        throw new Error('Bad Hex');
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

    dispatchSetDataIncluded(data) {
        this.props.dispatch(setDataIncluded(data))
    }

    createIncludedTreesObj(obj) {
        const idArr = obj.map(tree => {return tree._id});
        let data = {};

        idArr.forEach(id => {
            let type = obj.filter(item => {return item._id == id});

            data[id] = {
                included: true,
                type: type[0].properties.GATTUNG_DEUTSCH,
            };
        })

        this.dispatchSetDataIncluded(data);
    }

    collectCountTrees(types) {
        let query = [];
        types.forEach((type,i) => {
            
            let part = `${i == 0 ? '?' : '&'}types=${type}`;
            query.push(part);
        });

        const all = query.join('');
        const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/types/count";
        const url = `${remote}${all}`;

        return this.promiseGet(url);
    }

    dispatchSetTypeColors(obj) {
        this.props.dispatch(setTypeColors(obj));
    } 

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    setTypeColors() {
        const numTags = typesJson.types.length;
        const v = (1 / numTags);
        
        const colorDict = {};

        let vals = []

        typesJson.types.forEach((tag,i) => {
            vals.push(v * (i + 1))
        })

        vals = this.shuffle(vals);
        
        typesJson.types.forEach((tag,i) => {
            let hexColor = d3InterpolatePlasma(vals[i]);
            let rgba = this.hexToRgbA(hexColor);

            colorDict[tag] = {
                color: rgba,
                id: `identifier-${i}`,
            }

            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = `#identifier-${i} { background: ${hexColor}; }`;
            document.getElementsByTagName('head')[0].appendChild(style);
        });
        
        this.dispatchSetTypeColors(colorDict);
        this.dispatchSetColorsShuffled(true);

        return colorDict;
    }

    requestTypes() {
        let types = this.flatten(this.state);
        this.dispatchSetActiveTreeTypes(types);

        let promiseArr = [];
        let offset = 0;
        let iterator
        
        return new Promise((resolve, reject) => {

                this.dispatchSetTreeTypeDataLoading(true);
                this.dispatchSetTreeAgeDataUpdated(false);
                this.dispatchSetWateredTreeDataUpdated(false);

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

                        this.dispatchSetTreeTypeDataUpdated(true);
                        this.dispatchSetTreeTypeDataLoading(false);
                        this.dispatchSetTreeTypeData(this.fetched);
                        this.createIncludedTreesObj(this.fetched);
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
        

        if (this.props.treeTypeDataLoading) {
            return (
                <FilterLoadingDiv>
                    <Spinner>
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </Spinner>
                    <span>Zähle Bäume ...</span>
                </FilterLoadingDiv>
            )
        } else if (!this.props.treeTypeDataLoading) {
            return (
                <TagsDiv className="tags">
                    <TileHeadline>Baumgattung</TileHeadline>
                    <ReactTags tags={tags}
                        suggestions={suggestions}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        delimiters={delimiters} 
                        id={"type"}
                        />
                    <ButtonWaterSpan onClick={this.requestTypes}>Filter</ButtonWaterSpan>
                </TagsDiv>
            )
        }
    }
}

export default connect(mapStateToProps)(Tags);

