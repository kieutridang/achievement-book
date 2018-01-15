import React, { Component } from 'react';

export default class Button extends Component  {
  constructor(props) {
    super(props);
    this.alertClicked = this.alertClicked.bind(this);
  }

  alertClicked() {
     alert('Clicked successful');
  }

  render() {
    const { name } = this.props;
    return (
      <div className = 'button'>
        <button type='button' onClick={alertClicked}>{name}</button>
      </div>
    )
  }
};
