import React, { Component } from 'react'
import {_helper} from '../api/_helper'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: '',
      city: 'Ho Chi Minh',
      department: [],

      showMessage: false
    }
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}
