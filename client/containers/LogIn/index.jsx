import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';
import { _helper } from '../../components/api/_helper';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
      message: '',
      showMessage: false,
      redirect: false
     }
  }

  render() {
    const { redirect, message, showMessage} = this.state
    if (redirect) {
      return (
        <Redirect to={'/home'}></Redirect>
      )
    }
    return (
      <div>
        <div>
          <h1> Log In </h1>
        </div>
        <div>
          <Input
            label = "Username"
            onChange = {(username) => {this.setState({username})}}     
            showMessage = {this.state.showMessage}
          />
          <Input
            type = "password"
            label = "Password"
            onChange={(password) => { this.setState({ password }) }}
          />
        </div>
        <div>
          <Button
            value = "Log In"
            onClick = {this.login}
          />
          {showMessage &&
            <span>{message}</span>
          }
          <Link to='/register'>
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    )
    login = () => {
      const {username, password} = this.state;
      _helper.fetchPOST(
        "/login",
        {
          username,
          password
        }
      )
      .then((response) => {
        if (response) {
          if (response.message){
            this.setState({
              showMessage: true,
              message: response.message
            })
          }
          else {
            localStorage.setItem('token', response.token);
            this.setState({
              redirect: true
            })
          }
        }
      })
    }
  }
}
