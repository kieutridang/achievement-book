import React, { Component } from 'react';

export default class Select extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, label, optionsList } = this.props;
    return (
      <div>
        <label> {label} </label>
        <select onChange = {e => this.props.onChange(name, e.target.value)}>
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
