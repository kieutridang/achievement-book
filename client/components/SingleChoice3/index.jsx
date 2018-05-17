import React, { Component } from 'react';

export default class SingleChoice extends Component {
  handleChange = (e) => {
    const { name, setFieldValue, submitForm } = this.props;
    setFieldValue(name, e.target.value);
    setTimeout(() => {
      submitForm();
    }, 50);
  }

  render() {
    const { label, name, optionsList, choice } = this.props;    
    return (
      <div>
        <label> {label} </label>
        <form>
          {
            optionsList.map((option, index) => {
              return (
                <div key={index}>
                  <label className={choice === index ? "radio-image chosen-radio" : "radio-image"} htmlFor={option}>
                    <input
                      type='radio'
                      name={name}
                      value={index}
                      id={option}
                      checked={index == choice}
                      onChange={this.handleChange} 
                    />
                  </label>
                  <label htmlFor={option}>
                    {option}
                  </label>
                </div>
              )
            })
          }
        </form>
      </div>
    )
  }
}
