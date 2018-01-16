import React from 'react';

export default class Button extends React.Component  {
  constructor(props) {
    super(props);
    this.state = { name: this.props.name };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name) {
    alert('Button has been clicked!');
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.name}
      </button>
    )
  }
};
