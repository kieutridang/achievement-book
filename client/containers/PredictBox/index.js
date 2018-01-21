import React, { Component } from 'react';
import { calculateHousePrice } from '../../components/api/house'
import Input from '../../components/Input/index.jsx'

export default class PredictBox extends Component {
  state = {  
    square: 0,
    bedroom: 0,
    distance: 0,
    price: 0,
  }

  render() {
    const { price } = this.state
    return (
      <div>
        <h3>Predict Box</h3>
        <Input name={'square'} label={'Square'} onChange={(square) => this.setState({square})}/>
        <Input name={'bedroom'} label={'No.Bedroom'} onChange={(bedroom) => this.setState({bedroom})}/>
        <Input name={'distance'} label={'Distance to city center'} onChange={(distance) => this.setState({distance})}/>
        <button onClick={this._calculatePrice}>Calculate</button>
        <div>
          <label>House Price:</label>
          <label>{price}</label>
        </div>
        <hr/>
      </div>
    );
  }

  _calculatePrice = () => {
    const { square, bedroom, distance } = this.state
    calculateHousePrice(square, bedroom, distance).then(data => {
      this.setState({
        price: data.price
      })
    })
  }
}