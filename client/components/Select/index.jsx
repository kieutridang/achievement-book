import React, { Component } from 'react';

export default class Select extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    const { label, required, optionsList, selectedValue, disabled, disabledMessage } = this.props;
    return (
      <div>
        <label className='page-label'> {label}: </label>
        { required && <span> * </span> }
        <select onChange={e => this.props.onChange(e.target.value)} disabled={disabled} defaultValue={selectedValue}>
          { disabled && <option> {disabledMessage} </option> }
          {
            optionsList.map((option, index) => {
              return (
                <option key={index} value={option}> {option} </option>
              )

            })
          }
        </select>
      </div>
    )
  }
}
