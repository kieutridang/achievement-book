import React, { Component } from 'react';
import Input from '../../components/Input/index.jsx'
import { getHouses, addHouse } from '../../components/api/house'

export default class TrainingDataTable extends Component {
  state = { 
    data: [],
    square: 0,
    bedroom: 0,
    distance: 0,
    price: 0,
  }

  componentDidMount() {
    getHouses().then(data => this.setState(data))
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={this._addButtonHandler}>Add</button>
            </th>
            <th>
              <Input name={'square'} label={'Square'}/>
            </th>
            <th>
              <Input name={'bedroom'} label={'No.Bedroom'}/>
            </th>
            <th>
              <Input name={'distance'} label={'Distance to city center'}/>
            </th>
            <th>
              <Input name={'price'} label={'House price'}/>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.data && this.state.data.map((house, i) => {
              return (
                <tr key={house.id}>
                  <td>{i + 1}</td>
                  <td>{house.square}</td>
                  <td>{house.numberOfBedrooms}</td>
                  <td>{house.distance}</td>
                  <td>{house.price}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }

  _addButtonHandler = () => {
    const { square, bedroom, distance, price } = this.state
    addHouse(square, bedroom, distance, price).then(data => alert(data))
  }
}