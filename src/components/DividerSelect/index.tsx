import React from 'react';
import styled from 'styled-components';
// import classnames from 'classnames';
import { connect } from 'unistore/react';
import Actions from '../../state/Actions';

// import { setTabActive } from '../../store/actions';

const DivWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  font-size: 12px;
`;

const ButtonSelect = styled.span`
    font-size: ${props => props.theme.fontSizeXL} !important;
    padding: 6px;
    width: 90px;
    padding-top: 6px;
    padding-bottom: 6px;
    cursor: pointer;
    text-align: center;
    border-radius: 6px;
    transition: opacity ${props => props.theme.timeS}

    &:nth-of-type(2) {
        margin: 0 9px;
    }

    &:hover {
        background: ${props => props.theme.colorPrimaryHover};
        transition: background ${props => props.theme.timeS}
    }

    &.active {
        background: ${props => props.theme.colorPrimary};
        transition: background ${props => props.theme.timeS}
    }
`;

// const mapStateToProps = state => {
//   return {
//     tabActive: state.tabActive,
//   };
// };

class Divider extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  dispatchActiveTab(val) {
    // this.props.dispatch(setTabActive(val));
  }

  handleClick(evt) {
    let btns = document.querySelectorAll('.type-btn');

    btns.forEach(btn => {
      btn.classList.remove('active');
    });

    this.dispatchActiveTab(evt.target.id);

    // document.querySelector(`#${evt.target.id}`).classList.add('active');
  }

  render() {
    return (
      <DivWrapper>
        <ButtonSelect
          className='type-btn active'
          id='id-0'
          onClick={e => {
            this.handleClick(e);
          }}
        >
          Alter
        </ButtonSelect>
        <ButtonSelect
          className='type-btn'
          id='id-1'
          onClick={e => {
            this.handleClick(e);
          }}
        >
          Gattung
        </ButtonSelect>
        <ButtonSelect
          className='type-btn'
          id='id-2'
          onClick={e => {
            this.handleClick(e);
          }}
        >
          Größe
        </ButtonSelect>
      </DivWrapper>
    );
  }
}

export default Divider;
