import React, { Component } from 'react';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import Choice from '../Choice/Choice.jsx';
import UploadImage from '../UploadImage/UploadImage.jsx'
import './Form.scss'

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        picture: '',
        name: '',
        email: '',
        DOB: '',
        gender: '',
        city: 'Ho Chi Minh'
      },
      validate: {
        picture: false,
        name: false,
        email: false,
        DOB: false,
        gender: false,
        city: true
      }
    }
  }
  render() {
    return (
      <div className='wrapper'>
        <h1> Registration Form </h1>
        <div>
          <UploadImage 
            src = './Pictures/empty-picture.png'
            label = 'Upload Picture'
            id= 'user-picture'
            property = 'picture'
            changeHandle = {this._changHandle}
          />
          <div>
            <Input 
            type = "text"
            label = "Name"
              property = "name"
              validateAndMessage = {[
                {regExp: '(^| )[a-z]', message: 'Your name need capitalized', valid: false},
                {regExp: '^.{0,7}$', message: 'Your name is at least 8 character', valid: false}
              ]}
              changeHandle = {this._changHandle}
              validate = {this.state.validate.name}
              />
              <Input 
              type = "text"
              label = "Email"
              property = "email"
              validateAndMessage = {[
                {regExp: '^[a-z0-9\\.]*[a-z0-9]@[a-z]+\\.([a-z]+\\.)*[a-z0-9]+$', message: '', valid: true},
                {regExp: '\w*', message: 'Your email is not valid', valid: false}
              ]}
              changeHandle = {this._changHandle}
              validate = {this.state.validate.email}
              />
              <Input 
              type = "date"
              label = "DOB"
              property = "DOB"
              validateAndMessage = {[
                { regExp: '^.{0,0}$', message: 'Not valid date', valid: false }
              ]}
              changeHandle = {this._changHandle}
              validate = {this.state.validate.DOB}
              />
              <Select
              label = "City"
              property = "city"
              optionList = {[
                {key: 'Ho Chi Minh', value: 'Ho Chi Minh'}, 
                {key: 'Da Nang', value: 'Da Nang'},
                {key: 'Ha Noi', value: 'Ha Noi'}
              ]}
              changeHandle = {this._changHandle}
              />
              <Choice
              label = "Gender"
              property = "gender"
              type = 'radio'
              optionList = {[
                {key: 'Male', value: 'male'},
                {key: 'Female', value: 'female'}
              ]}
              changeHandle = {this._changHandle}
              validate = {this.state.validate.gender}
              />
              </div>
        </div>
        <button onClick={this._addUserInfo}> Submit </button>
      </div>
    );
  }
  _changHandle = (property, value, validate) => {
    let newInfo = JSON.parse(JSON.stringify(this.state.info));
    let newValidate = JSON.parse(JSON.stringify(this.state.validate));
    newInfo[property] = value;
    newValidate[property] = validate;
    this.setState({
      info: newInfo,
      validate: newValidate
    })
  }
  _addUserInfo = () => {
    this.props.addUserInfo(this.state)
  }
}