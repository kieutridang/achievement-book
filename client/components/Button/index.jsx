import React, { Component } from 'react';

export default class Button extends Component  {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={this.props.onClick}>
        {this.props.value}
      </button>
    )
  }
};
