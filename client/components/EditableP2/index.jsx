import React, { Component } from 'react';

import './index.scss'

export default class EditableP extends Component {
  handleInput = (value) => {
    const maxlength = this.props.maxlength || 2000;
    const { setFieldValue, name } = this.props;
    if (value.length <= maxlength) {
      setFieldValue(name, value);
    }
  }
  handleKeyPress = (event) => {
    const { value } = this.props;
    const maxlength = this.props.maxlength || 2000;
    if (value.length == maxlength) {
      event.preventDefault();
    }
  }
  handlePaste = (event) => {
    event.preventDefault();
    const value = this.p.innerText + event.clipboardData.getData("text/plain");
    const maxlength = this.props.maxlength || 500;
    if (value.length <= maxlength) {
      this.handleInput(value);
      document.execCommand("insertHTML", false, value);
    }
  }
  render() {
    const { label, name, value, maxlength, disabled, error, touched, submitForm } = this.props;
    return (
      <div>
        <label>{label}</label>
        <div className='editableP'>
          <p
            id={name}
            className={disabled ? 'content-disabled' : ''}
            contentEditable={!disabled}
            onKeyPress={(event) => this.handleKeyPress(event)}
            onPaste={(event) => this.handlePaste(event)}
            onInput={(e) => this.handleInput(e.target.innerText)}
            onBlur={submitForm}
          >
          </p>
        </div>
        <div>
          {
            error && touched && (
              <div>{error}</div>
            )
          }
        </div>
      </div>
    );
  }
}