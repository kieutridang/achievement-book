import React from 'react';

export default class Button extends React.Component  {
  constructor(props) {
    super(props);
    this.state = { name: this.props.name };
  }

  render() {
    return (
      <button onClick={() => this.props.handleClick()}>
        {this.state.name}
      </button>
    )
  }
};
