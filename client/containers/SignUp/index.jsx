import React, { Component } from 'react'
import Input from '../../components/Input/index.jsx'
import Select from '../../components/Select/index.jsx'
import SingleChoice from '../../components/SingleChoice/index.jsx'
import MultipleChoice from '../../components/MultipleChoice/index.jsx'
import UploadImage from '../../components/UploadImage/index.jsx'
import Button from '../../components/Button/index.jsx'

import { _helper } from '../../components/api/_helper'
import { checkValidate } from '../../components/functions/checkValidate'
import { validations } from '../../components/functions/validations'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import checkAuthenticate from '../../components/functions/checkAuthenticate';
import './index.scss';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '../../../public/default-profile-pic.png',
      username: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      email: '',
      DOB: '',
      gender: '',

      message: '',
      redirect: false,
      showMessage: false,
      authenticate: false
    }
  }

  checkAuth = () => {
    checkAuthenticate().then((authenticate) => {
      this.setState({authenticate});
    })
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkConfirmPassword = () => {
    if (this.state.password != this.state.confirmPassword)
      return "Confirm password need to be the same with password";
    return null;
  }

  signUp = () => {
    this.setState({showMessage: true});
    if (
      checkValidate.checkAvatar(this.state.avatar, true, validations.avatar) == null &&
      checkValidate.checkText(this.state.username, validations.username) == null &&
      checkValidate.checkText(this.state.password, validations.password) == null &&
      this.checkConfirmPassword() == null &&
      checkValidate.checkText(this.state.fullName, validations.name) == null &&
      checkValidate.checkText(this.state.email, validations.email) == null &&
      checkValidate.checkText(this.state.DOB, validations.DOB) == null &&
      checkValidate.checkSingleChoice(this.state.gender, true, validations.gender) == null
    ) {
      const { avatar, username, password, fullName, email, DOB, gender } = this.state;
      _helper.fetchAPI(
        "/user/createuser",
        {
          avatar: avatar,
          username: username,
          password: password,
          fullname: fullName,
          email: email,
          DOB: DOB,
          gender: gender
        }
      ).then((response) => {
        if (response) {
          const { data, status } = response;
          if (data) {
            this.setState({message: data}, function() {
              alert(this.state.message);
              if (this.state.message == 'Create user successful') {
                this.setState({
                  redirect: true
                })
              }
            })
          }
        }
      });

    }
  }

  render() {
    let { authenticate, redirect} = this.state;

    if (authenticate) {
      return (
        <Redirect to={'/home'}></Redirect>
      )
    }
    if (redirect) {
      return (
        <Redirect to={'/users/login'}></Redirect>
      )
    }
    return (
      <div className='signup'>
        <div>
            <div><h1>Sign up</h1></div>
            <div>
              <UploadImage
                onChange = {(avatar) => {this.setState({avatar})}}
                srcData = {this.state.avatar}
                required = {true}
                button={true}
                message = {
                  checkValidate.checkAvatar(this.state.avatar, true, validations.avatar)
                }
                showMessage = {this.state.showMessage}
              />
              </div>
              <div>
                <div>
                  <div>
                    <h1>Sign up</h1>
                    <Input

                      label = 'Username'
                      onChange = {(username) => {this.setState({username})}}
                      message = {
                        checkValidate.checkText(this.state.username, validations.username)
                      }
                      showMessage = {this.state.showMessage}
                    />
                    <Input

                      type = 'password'
                      label = 'Password'
                      onChange = {(password) => {this.setState({password})}}
                      message = {
                        checkValidate.checkText(this.state.password, validations.password)
                      }
                      showMessage = {this.state.showMessage}
                    />
                    <Input

                      type = 'password'
                      label = 'Confirm password'
                      onChange = {(confirmPassword) => {this.setState({confirmPassword})}}
                      message = {this.checkConfirmPassword()}
                      showMessage = {this.state.showMessage}
                    />
                  </div>
                <div>
                    <Input

                      label = 'Full Name'
                      onChange = {(fullName) => {this.setState({fullName})}}
                      message = {
                        checkValidate.checkText(this.state.fullName, validations.name)
                      }
                      showMessage = {this.state.showMessage}
                    />
                    <Input

                      label = 'Email'
                      onChange = {(email) => {this.setState({email})}}
                      message = {
                        checkValidate.checkText(this.state.email, validations.email)
                      }
                      showMessage = {this.state.showMessage}
                    />
                  <Input

                      type = 'date'
                      label = 'DOB'
                      onChange = {(DOB) => {this.setState({DOB})}}
                      message = {
                        checkValidate.checkText(this.state.DOB, validations.DOB)
                      }
                      showMessage = {this.state.showMessage}
                    />
                  <SingleChoice
                      label = 'Gender'
                      optionsList = {[
                        'Male',
                        'Female'
                      ]}
                      onChange = {(gender) => {this.setState({gender})}}
                      message = {
                        checkValidate.checkSingleChoice(this.state.gender, true, validations.gender)
                      }
                      showMessage = {this.state.showMessage}
                    />
                    </div>
                </div>
                <div>
                  <Button
                    onClick = {this.signUp}
                    value = 'Create account'
                  />
                  <Link to='/users/login'>Log In</Link>
                </div>
            </div>
          </div>
      </div>
    )
  }
}
