import React, { Component } from 'react';

export default class Select extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    const { label, required, optionsList } = this.props;
    return (
      <div>
        <label> {label}: </label>
        { required && <span> * </span> }
        <select onChange = {e => this.props.onChange(e.target.value)}>
          {
            optionsList.map((option, index) => {
              return (
                <option key = {index} value = {option}> {option} </option>
              )
            })
          }
        </select>
      </div>
    )
  }
}
