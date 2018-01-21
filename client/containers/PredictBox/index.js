import React, { Component } from 'react';

export default class PredictBox extends Component {
  state = {  
    price: 0,
  }

  componentDidMount() {
    
  }

  render() {
    const { price } = this.state
    return (
      <div>
        <h3>Predict Box</h3>
        <Input label={'Square'}/>
        <Input label={'No.Bedroom'}/>
        <Input label={'Distance to city center'}/>
        <button>Calculate</button>
        <div>
          <label>House Price:</label>
          <label>{price}</label>
        </div>
      </div>
    );
  }
}