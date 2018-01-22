import React, { Component } from 'react'
import Button from '../Button/index.jsx'
import Select from '../Select/index.jsx'
import SingleChoice from '../SingleChoice/index.jsx'
import MultipleChoice from '../MultipleChoice/index.jsx'
import Input from '../Input/index.jsx'

import {_helper} from '../api/_helper'
import {checkValidate} from '../functions/checkValidate'
import {validations} from '../functions/validations'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',

      showMessage: false
    }
  }

  showMessage = () => {
    this.setState({showMessage: true});
  }
  
  render() {
    return (
      <div>
        <button onClick={() => {
          _helper.fetchGET(
            '/user/userid/5a61f703f29dd3283e449c96',
            [{ 'Content-Type': 'javascript/json' }],)
            .then((response) => {
              console.log(response);
            })

          {/* _helper.fetchPOST(
            '/user/createuser', 
            {
              username: 'congaa',
              password: 'huygaa',
              email: 'thucga@gmail.com',
              fullname: 'Duy La Con Ga',
              DOB: '01-01-1111',
              gender: 'Female'
            },
            [{'Content-Type': 'javascript/json'}],
            "POST"
            ).then((response) => {
              console.log(response);
            })
            .*/}
          }}>
          ClickMe
        </button>
        <Input
          label = 'Name'
          required = {true}
          onChange = {(name) => {this.setState({name})}}
          message = {checkValidate.checkText(this.state.name, validations.name)}
          showMessage = {this.state.showMessage}
        />
        <Input
          label = 'Age'
          type = 'number'
          onChange={(age) => { this.setState({ age }) }}
        />
        <Button 
          value = 'Submit'
          onClick = {this.showMessage}/>
      </div>
    )
  }
}
