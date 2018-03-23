import React, { Component } from 'react'
import Button from '../Button/index.jsx'
import Select from '../Select/index.jsx'
import SingleChoice from '../SingleChoice/index.jsx'
import MultipleChoice from '../MultipleChoice/index.jsx'
import Input from '../Input/index.jsx'
import UploadImage from '../UploadImage/index.jsx'
import DateSelection from '../DateSelection/index'

import {_helper} from '../api/_helper'
import {checkValidate} from '../functions/checkValidate'
import {validations} from '../functions/validations'
import moment from 'moment'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: '',
      city: 'Ho Chi Minh',
      department: [],

      showMessage: false,
      date: moment().format('YYYY-MM-DD')
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => {
          _helper.fetchGET(
            '/user/userid/5a61f703f29dd3283e449c96',
            [{ 'Content-Type': 'javascript/json' }],)
            .then((response) => {
            })

          {/* _helper.fetchPOST(
            '/user/createuser', 
            {
              username: 'congaa',
              password: 'huygaa',
              email: 'thucga@gmail.com',
              fullname: 'Duy La Con Ga',
              DOB: '01-01-1111',
              gender: 'Female',
              avatar: this.state.avatar
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
        <Select 
          label = 'City'
          required = {true}
          optionsList = {[
            'Ho Chi Minh',
            'Ha Noi',
            'Da Nang'
          ]}
          onChange = {(city) => this.setState({city})}/>
        <SingleChoice 
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
          onChange = {(gender) => this.setState({gender})}/>
        <MultipleChoice
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
          onChange = {(department) => this.setState({department})}/>
        <Input
          label = 'Name'
          required = {true}
          onChange = {(name) => {this.setState({name})}}
          message = {checkValidate.checkText(this.state.name, validations.name)}
          showMessage = {this.state.showMessage}
        />
        <UploadImage
          property = 'avatar'
          onChange = {(avatar) => {this.setState({avatar})}}
          srcData = {this.state.avatar}
        />
        <Button 
          value = 'Submit'
          onClick = {() => {this.setState({showMessage: true})}}/>
          <DateSelection
            date = {this.state.date}
            handleChange = {(newDate) => {this.setState({date: newDate})}}
          />
      </div>
    )
  }
}
