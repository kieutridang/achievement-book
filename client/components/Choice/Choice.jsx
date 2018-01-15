import React, { Component } from 'react';
import './Choice.scss';

export default class Choice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      validate: false,
    }
  }
  render() {
    const {label, optionList, type, property} = this.props;
    return (
      <div className = 'Choice'>
        <label> {label} :</label>
        <div>
        {
          optionList.map((element, index) => {
            return (
              <div key={index}>
                <input 
                  type = {type}
                  name = {property}
                  value = {element.value}
                  id = {element.value}
                  onClick = {() => {this._changeHandle(label, element.value)}}
                />
                <label htmlFor={element.value}>{element.key}</label>
              </div>
            )
          })
        }
        </div>
        <div></div>
        <label>{!this.state.validate && "You need to choose one"}</label>
      </div>
    );
  }
  _changeHandle = (label, value) => {
    this.setState({
      value: value,
      validate: true
    },() => {
      this.props.changeHandle(this.props.property, this.state.value, this.state.validate);
    })
  }
}