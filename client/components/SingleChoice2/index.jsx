import React, { Component } from 'react';

export default class SingleChoice2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, required, optionsList, message, showMessage, choice } = this.props;
    const property = label.toLowerCase().replace(' ', '-');
    return (
      <div>
        <label className='page-label'> {label}: </label>
        <form>
          { required && <span> * </span> }
          {
            optionsList.map((option, index) => {
              return (
                <div key={index}>
                  <label className={choice === index ? "radio-image chosen-radio" : "radio-image"} htmlFor={option}>
                    <input
                      type='radio'
                      name={property}
                      value={option}
                      id={option}
                      checked={index === choice}
                      onChange={(e) => this.props.onChange(e.target.value)} 
                    />
                  </label>
                  <label>
                    {option} 
                    <span></span>
                  </label>
                </div>
              )
            })
          }
        </form>
        <div></div>
        { showMessage && message && <span> {message} </span> }
      </div>
    )
  }
}
