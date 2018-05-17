import React, { Component } from 'react';

export default class OnBlurInput extends Component {
  state = {
    editing: false,
  }
  handleDoubleClick = () => {
    const { editing } = this.state;
    this.setState({editing: !editing});
  }
  handleBlur = () => {
    const { handleBlur } = this.props;
    this.setState({editing: false}, handleBlur);
  }
  render() {
    const { type, label, name, value, error, touched, handleChange, handleBlur, maxLength } = this.props;
    const { editing } = this.state;
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        {(editing || error || !touched) ?
          (<input 
            type={type || "text"}
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={maxLength || 2000}
          />)
          : <span onDoubleClick={this.handleDoubleClick}> {value} </span>
        }
        {
          error && touched && (
            <div> { error }</div>
          )
        }
      </div>
    );
  }
}