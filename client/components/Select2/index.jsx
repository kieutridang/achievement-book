import React, { Component } from 'react';

export default class Select extends Component{
  handleChange = (e) => {
    const { setFieldValue, submitForm, name, setSubmitting } = this.props;
    setSubmitting(true);
    setFieldValue(name, e.target.value);
    setTimeout(() => {
      submitForm();
    }, 50);
  }
  render() {
    const { label, name, optionsList, value, disabled, disabledMessage, error, touched } = this.props;
    return (
      <div>
        <label> {label} </label>
        <select onChange={this.handleChange} disabled={disabled} value={value} id={name}>
          { disabled && <option> {disabledMessage} </option> }
          {
            optionsList.map((option, index) => {
              return (
                <option key={index} value={option}> {option} </option>
              )

            })
          }
        </select>
        { error && touched && (
          <div>{error}</div>
        )}
      </div>
    )
  }
}
