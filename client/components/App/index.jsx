import React, { Component } from 'react'
import Button from '../Button/index.jsx'
import Select from '../Select/index.jsx'
import SingleChoice from '../SingleChoice/index.jsx'
import MultipleChoice from '../MultipleChoice/index.jsx'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <div>
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
          message = {this.getMessage('gender')}
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
          message = {this.getMessage('department')}
          showMessage = {this.state.showMessage}
          onChange = {(name, value) => this.handlingChange(name, value)}/>
        <Button 
          value = 'Submit'
          onClick = {this.showMessage}/>
      </div>
    )
  }
}
