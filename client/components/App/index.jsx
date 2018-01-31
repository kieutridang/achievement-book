import React, { Component } from 'react'
import Button from '../Button/index.jsx'
import Select from '../Select/index.jsx'
import SingleChoice from '../SingleChoice/index.jsx'
import MultipleChoice from '../MultipleChoice/index.jsx'
import Input from '../Input/index.jsx'
import UploadImage from '../UploadImage/index.jsx'

import {_helper} from '../api/_helper'
import {checkValidate} from '../functions/checkValidate'
import {validations} from '../functions/validations'


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
