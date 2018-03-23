import React, { Component } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    let { type, label, onChange, message, showMessage } = this.props;
    return (
      <div>
        <input
          type={type || 'text'}
          onChange={(e) => (onChange(e.target.value))}
          placeholder={label}
        />
        {showMessage && message && <span>{message}</span>}
      </div>
    );
  }
}
