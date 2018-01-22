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
      city: 'Ho Chi Minh',
      gender: '',
      department: [],

      showMessage: false
    }
  }

  showMessage = () => {
    this.setState({showMessage: true});
  }

  getMessage = (name) => {
    if (this.state[name].length === 0) {
      switch (name) {
        case 'gender':
          return "You must choose your gender";
        case 'department':
          return "You must choose at least one department";
      }
    }
    return null;
  }

  handlingChange = (name, value) => {
    this.setState({ [name]: value });
  }

  messageForText = (name, value) => {
    return 'OK';
  }

  render() {
    return (
      <div>
        <button onClick={() => {
          _helper.fetchGET(
            '/user/useri/5a61f703f29dd3283e449c96',
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
            .catch((error) => {
              console.log(error);
            }) */}
          }}>
          ClickMe
        </button>
        <Select 
          name = 'city'
          label = 'City'
          required = {true}
          optionsList = {[
            'Ho Chi Minh',
            'Ha Noi',
            'Da Nang'
          ]}
          onChange = {(name, value) => this.handlingChange(name, value)}/>
        <SingleChoice 
          name = 'gender'
          label = 'Gender'
          required = {true}
          optionsList = {[
            'Male',
            'Female'
          ]}
          message={
            checkValidate.checkSingleChoice(this.state.gender, true, validations.gender)
          }
          showMessage = {this.state.showMessage}
          onChange = {(name, value) => this.handlingChange(name, value)}/>
        <MultipleChoice
          name = 'department'
          label = 'Department'
          required = {true}
          optionsList = {[
            {value: 'Student', checked: false},
            {value: 'Teacher', checked: false},
            {value: 'Blahblah', checked: false}
          ]}
          message = {
            checkValidate.checkMultipleChoice(this.state.department, true, validations.department)
          }
          showMessage = {this.state.showMessage}
          onChange = {(name, value) => this.handlingChange(name, value)}/>
        <Input
          name = 'name'
          label = 'Name'
          required = {true}
          onChange = {this.handlingChange}
          message = {checkValidate.checkText(this.state.name, validations.name)}
          showMessage = {this.state.showMessage}
        />
        <Button 
          value = 'Submit'
          onClick = {this.showMessage}/>
      </div>
    )
  }
}
