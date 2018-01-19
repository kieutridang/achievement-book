import React, { Component } from 'react';

export default class SingleChoice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, label, required, optionsList, message, showMessage } = this.props;
    return (
      <div>
        <label> {label}: </label>
        { required && <span> * </span> }
        <form>
          {
            optionsList.map((option, index) => {
              return (
                <div key={index}>
                  <label>
                    <input 
                      type='radio'
                      name={name} 
                      value={option} 
                      onClick={(e) => this.props.onChange(name, e.target.value)}/>
                      {option} 
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