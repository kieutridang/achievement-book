import React, { Component } from 'react';
import './Select.scss';


export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.optionList[0],
      validate: true
    }
  }
  render() {
    const {label, optionList} = this.props;
    return (
      <div className = 'Select'>
        <label>{label} :</label>
        <select>
          {
            optionList.map((element, index) => {
              return ( 
                <option 
                  key = {index}
                  value = {element.value}
                  onClick = {() => this._changeHandle(label, element.value)}
                >{element.key}</option>
              )
            })
          }
        </select>
        <div></div>
      </div>
    );
  }
  _changeHandle = (label, value) => {
    this.setState({
      value: value,
      validate: true
    }, () => {
      this.props.changeHandle(this.props.property, this.state.value, this.state.validate)
    })
  }
}