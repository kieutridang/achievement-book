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
  checkAuth = () => {
    _helper.fetchGET(
      '/user/checkAuthenticate',
      {
      }
    ).then((response) => {
      if (response){
        const {data, status} = response;
        if (status == 200){
          this.setState({
            redirect: true
          })
        }
      }
    })
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
        const {data, status} = response;
        alert(status);
        if (data) {
          this.setState({
            showMessage: true,
            message: data
          })
        }
        else {
          this.setState({
            redirect: true
          })
        }
      }
    })
  }
  componentWillMount = () => {
    this.checkAuth()
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
          {showMessage &&
            <span>{message}</span>
          }
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
          <Button
            value="Log In"
            onClick= {this.login}
          />
        </div>
        <div>
          <div>
            <Link to='/users/reset-password'>Forgot Password?</Link>
          </div>
          <div>
            <Link to='/users/register'>Sign Up</Link>
          </div>
        </div>
      </div>
    )
  }
}
