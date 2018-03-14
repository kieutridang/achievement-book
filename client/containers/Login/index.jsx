import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Input from '../../components/Input/index.jsx';
import Input2 from '../../components/Input2/index.jsx';
import Button from '../../components/Button/index.jsx';

import { _helper } from '../../components/api/_helper';
import checkAuthenticate from '../../components/functions/checkAuthenticate';

import './index.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      showMessage: false,
      authenticate: false
    }
  }
  checkAuth = () => {
    checkAuthenticate().then((authenticate) => {
      this.setState({
        authenticate: authenticate
      })
    })
  }
  componentDidMount = () => {
    this.checkAuth()
  }
  login = () => {
    const { username, password } = this.state;
    _helper.fetchAPI(
      "/user/login",
      {
        username,
        password
      }
    )
      .then((response) => {
        if (response) {
          const { data, status } = response;
          if (status == 200) {
            this.checkAuth()
          }
          else {
            if (status == 401){
              this.setState({
                showMessage: true,
                messagePassword: data,
                messageUser: '',
              })
            }
            else {
              this.setState({
                showMessage: true,
                messagePassword: '',
                messageUser: data,
              })
            }
          }
        }
      })
  }
  render() {
    const { authenticate, messageUser, messagePassword, showMessage } = this.state
    if (authenticate) {
      return (
        <Redirect to={'/home'}></Redirect>
      )
    }
    return (
      <div className="log-in">
        <div>
          <div>
            <div>
              <h1> Achievement Book </h1>
            </div>
            <div>
              <Input2
                label="username"
                onChange={(username) => { this.setState({ username }) }}
                showMessage={showMessage}
                message={messageUser}
              />
              <Input2
                type="password"
                label="password"
                onChange={(password) => { this.setState({ password }) }}
                showMessage={showMessage}
                message={messagePassword}
              />
            </div>
            <div>
              <Button
                value="Log In"
                onClick={this.login}
              />
              <div>
                <Link to='/users/reset-password'>Forgot Password?</Link>
              </div>
              <div>
                <Link to='/users/signup'>Sign Up</Link>
              </div>
            </div>
          </div>
          <div>
            <img src="http://localhost:8080/public/log-in-background.jpg" alt="" />
          </div>
        </div>
      </div>
    )
  }
}
