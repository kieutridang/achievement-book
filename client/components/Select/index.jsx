import React, { Component } from 'react';

export default class Select extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    const { label, required, optionsList, selectedIndex, disabled, disabledMessage } = this.props;
    return (
      <div>
        <label> {label}: </label>
        { required && <span> * </span> }
        <select onChange={e => this.props.onChange(e.target.value)} disabled={disabled}>
          { disabled && <option> {disabledMessage} </option> }
          {
            optionsList.map((option, index) => {
              return (
                selectedIndex === index ? 
                  <option key={index} value={option} selected> {option} </option>
                : <option key={index} value={option}> {option} </option>
              )
            })
          }
        </select>
      </div>
    )
  }
}
