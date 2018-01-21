import React, { Component } from 'react';
import Input from '../../components/Input/index.jsx'

export default class TrainingDataTable extends Component {
  state = { 
    data: [],
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
              <Input label={'Square'}/>
            </th>
            <th>
              <Input label={'No.Bedroom'}/>
            </th>
            <th>
              <Input label={'Distance to city center'}/>
            </th>
            <th>
              <Input label={'House price'}/>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
    );
  }

  _addButtonHandler = () => {
    alert('add')
  }
}