import React, { Component } from 'react'

export default class OnBlurInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',

      edit: false
    }
  }

  handlingBlur = (value) => {
    this.props.onBlur(value);
    this.setState({
      edit: false,
      value: value
    })
  }

  handlingDoubleClick = () => {
    this.setState({edit: true})
  }

  render() {
    let { type, label, required, suggestion, onBlur, message, showMessage } = this.props;
    let { value, edit } = this.state;
    return (
      <div>
        <label> {label}: </label>
        { required && <span>*</span> }
        { suggestion && 
          <div>
            <div></div>
            <p> {suggestion} </p>
          </div>
        }
        {
          (edit || value == '') ? 
            <input
              type = {type || 'text'}
              defaultValue = {value}
              onBlur = {e => this.handlingBlur(e.target.value)}
            />
          : <span onDoubleClick = {this.handlingDoubleClick}> {value} </span>
        }
        <div></div>
        { showMessage && message && <span>{message}</span> }
      </div>
    )
  }
}
