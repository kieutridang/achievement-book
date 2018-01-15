import React from 'react';

export default class Button extends React.Component  {
  handleClick = () => {
     alert('Clicked successful');
  }

  render() {
    return (
      <div className = 'button'>
        <button type='button' onClick={this.handleClick}>Click Me</button>
      </div>
    )
  }
};
