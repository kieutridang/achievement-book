import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
export default class Input extends Component {
    constructor(props) {
      super(props);
      this.state ={
        message:"This field can't be empty",
        validate: false,
      }
    }
    render() {
      const {label, property, validateAndMessage, type, changeHandle, validate, showValidation} = this.props;
      return (
        <div className = 'Input'>
          <label>{label} :</label>
          <input
            value = {this.props.value}
            type  = {type}
            onChange = {this._changeHandle.bind(this, label)}
            onBlur = {this._changeHandle.bind(this, label)}
          />
          <div></div>
          {showValidation && !this.state.validate && <label>{this.state.message}</label>}
        </div>
      );
    }
    _changeHandle = (label, e) => {
      let newValue = e.target.value;
      let newMessage = "";
      let newValidate = true;
      newValue = newValue.split(" ").filter(function(c) {return c!=""}).join(' ');
      for (let i = 0; i < this.props.validateAndMessage.length; ++i) {
        let element = this.props.validateAndMessage[i];
        let checkRegExp = new RegExp(element.regExp);
        if (checkRegExp.test(newValue)) {
          newMessage = element.message;
          newValidate = element.valid;
          break;
        }
      }
      this.setState({
        value: e.target.value,
        message: newMessage,
        validate: newValidate
      }, () => {
        this.props.changeHandle(this.props.property, this.props.value, this.state.validate);
      });
    }
  }
