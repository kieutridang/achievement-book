import React, { Component } from 'react'
import Input from '../../components/Input/index.jsx'
import Button from '../../components/Button/index.jsx'
import { _helper } from '../../components/api/_helper'

export default class LogIn extends Component {
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
        <h1> Log In </h1>
        <Input
          label = "Username"
          onChange = {(username) => {this.setState({username})}}     
          showMessage = {this.state.showMessage}
        />
        <Input
          type = "password"
          lable = "Password"
          onChange={(password) => { this.setState({ password }) }}
        />
        <Button
          onClick = {this.logIn()}
        />
        <Button
        />
        {showMessage &&
          <span>{message}</span>
        }
        <Link to='/register'>
          <button>Sign Up</button>
        </Link>
      </div>
    )
    logIn = () => {
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
