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
import NavigationBar from '../../components/NavigationBar/index.jsx';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      email: '',
      message: '',
      redirect: false,
      showMessage: false,
      authenticate: false,
      url: ''
    }
  }

  checkAuth = () => {
    checkAuthenticate().then((authenticate) => {
      this.setState({ authenticate });
    })
  }
  getURL = () => {
    const newUrl = window.location.href.split("/")[window.location.href.split("/").length-1];
    return newUrl;

}

  componentDidMount() {
    this.checkAuth();
    this.getURL();
  }

  checkConfirmPassword = () => {
    if (this.state.password != this.state.confirmPassword)
      return "Confirm password need to be the same with password";
    return null;
  }

  signUp = () => {
    this.setState({ showMessage: true });
    if (
      checkValidate.checkText(this.state.username, validations.username) == null &&
      checkValidate.checkText(this.state.password, validations.password) == null &&
      this.checkConfirmPassword() == null &&
      checkValidate.checkText(this.state.fullName, validations.name) == null &&
      checkValidate.checkText(this.state.email, validations.email) == null
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
            this.setState({ message: data }, function () {
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
  _onKeyPress = (event) => {
    debugger
    if(event.key == "Enter") { //13 is the enter keycode
      this.refs.signup.refs.button.click();
    }
  }

  render() {
    let { authenticate, redirect } = this.state;

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
        <NavigationBar authenticate={this.state.authenticate} url={this.getURL()} />
        <div className='wrapper'>
          <div>
            <img src='../../../public/logo.png'></img>
          </div>
          <div>
            <div>
              <div>
                <Input

                  label='Full Name'
                  onChange={(fullName) => { this.setState({ fullName }) }}
                  message={
                    checkValidate.checkText(this.state.fullName, validations.name)
                  }
                  showMessage={this.state.showMessage}
                  pressEnter = {this._onKeyPress}               
                />
                <Input

                  label='Email'
                  onChange={(email) => { this.setState({ email }) }}
                  message={
                    checkValidate.checkText(this.state.email, validations.email)
                  }
                  showMessage={this.state.showMessage}
                  pressEnter = {this._onKeyPress}
                />
                <Input

                  label='Username'
                  onChange={(username) => { this.setState({ username }) }}
                  message={
                    checkValidate.checkText(this.state.username, validations.username)
                  }
                  showMessage={this.state.showMessage}
                  pressEnter = {this._onKeyPress}
                />
                <Input

                  type='password'
                  label='Password'
                  onChange={(password) => { this.setState({ password }) }}
                  message={
                    checkValidate.checkText(this.state.password, validations.password)
                  }
                  showMessage={this.state.showMessage}
                  pressEnter = {this._onKeyPress}
                />
                <Input

                  type='password'
                  label='Confirm password'
                  onChange={(confirmPassword) => { this.setState({ confirmPassword }) }}
                  message={this.checkConfirmPassword()}
                  showMessage={this.state.showMessage}
                  pressEnter = {this._onKeyPress}
                />
              </div>

            </div>
            <div>
              <Button
                onClick={this.signUp}
                value='Create account'
                refName = "button"
                ref = "signup"
              />
              <Link to='/users/login'>Log In</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
