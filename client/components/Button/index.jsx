import React from 'react';

export default class Button extends React.Component  {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={this.props.handlingClick}>
        {this.props.name}
      </button>
    )
  }
};
