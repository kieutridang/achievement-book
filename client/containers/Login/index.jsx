import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/index.jsx';
import Input2 from '../../components/Input2/index.jsx';
import Button from '../../components/Button/index.jsx';
import { _helper } from '../../components/api/_helper';
import checkAuthenticate from '../../components/functions/checkAuthenticate';
import './index.scss';
import { debug } from 'util';
import NavigationBar from '../../components/NavigationBar/index.jsx';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      showMessage: false,
      url: ''
    }
  }
  checkAuth = () => {
    const { history } = this.props;
    checkAuthenticate().then((authenticate) => {
      if (authenticate) history.replace('/home');
    })
  }
  getURL = () => {
    const newUrl = window.location.href.split("/")[window.location.href.split("/").length-1];
    return newUrl;

}
  componentDidMount = () => {
    this.checkAuth();
    // this.getURL();
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
            this.checkAuth();
      
          }
          else {
            if (status == 401) {
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
  _onKeyPress = (event) => {
    if(event.key == "Enter") { //13 is the enter keycode
      this.refs.login.refs.button.click();
    }
  }
  render() {
    const { messageUser, messagePassword, showMessage } = this.state;
    return (
      <div className="log-in">
        <NavigationBar authenticate={this.state.authenticate} url={this.getURL()} />
        <div>
          <div>
            <div>
              <img src='../../../public/logo.png' />
            </div>
            <div>
              <Input
                label="Username"
                onChange={(username) => { this.setState({ username }) }}
                showMessage={showMessage}
                message={messageUser}
                pressEnter={this._onKeyPress}
              />
              <Input
                type="password"
                label="Password"
                onChange={(password) => { this.setState({ password }) }}
                showMessage={showMessage}
                message={messagePassword}
                pressEnter={this._onKeyPress}
              />
            </div>
            <div>
              <Button
                value="Log In"
                onClick={this.login}
                refName={"button"}
                ref="login"
              />
              <div>
                <Link to='/users/reset-password'>Forgot Password?</Link>
              </div>
            </div>
          </div>
          <div>
            <img src="../../public/log-in-background.jpg" alt="" />
          </div>
        </div>
      </div>
    )
  }
}
