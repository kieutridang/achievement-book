import React from 'react';
import Input from '../Input/Input.jsx';
import './Login.scss'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            info: {
                username: '',
                password: ''
            },
            validate: {
                username: false,
                password: false
            },
            status: '',
            checkauth: false
        }
        this.checkAuth();
    }
    _changeState = (property, value) => {
      this.setState({
        [property]: value
      })
    }
    checkAuth = () => {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        let changeState = this._changeState
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              if (this.responseText == 'true') {
                console.log('CheckAuth successfully');
                changeState('checkAuth', true);
              }
              else {
                console.log('CheckAuth failed');                
                changeState('checkAuth', false);
              }
            }
        })

        xhr.open("GET", "http://localhost:8080/api/check-auth");
        xhr.setRequestHeader("auth-key", localStorage.authKey);
        xhr.send();
    }
    render() {
        if (this.state.checkAuth) {
          return (
            <Redirect to={'/registration'}></Redirect>
          )
        }
        return (
            <div className='Login'>
                <h1>Log In</h1>
                <Input
                    type="text"
                    label="Username"
                    property="username"
                    validateAndMessage={[
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.username}
                ></Input>
                <Input
                    type="password"
                    label="Password"
                    property="password"
                    validateAndMessage={[
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.password}
                ></Input>
                {(this.state.status != '') &&
                  <p>{this.state.status}</p>
                }
                <div>
                  <button onClick = {this.login} >Log In</button>
                  <Link to='/signup'>
                    <button>Sign Up</button>
                  </Link>
                </div>                
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
        });
    }
    handleStatus = () => {
      this.setState({
        status: 'Your username / password is incorrect'
      })
    }
    login = () => {
      var handleStatus = this.handleStatus;
      var checkAuth = this.checkAuth;

      var info = this.state.info;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (xhr.status === 401) handleStatus();
            else 
            {
              localStorage.setItem('authKey', this.responseText);
              alert('Loged in successfully');
              checkAuth();
            }
        }
      });
      
      xhr.open("GET", "http://localhost:8080/api/login");
      xhr.setRequestHeader('username', info.username);
      xhr.setRequestHeader('password', info.password);
      xhr.send();
    }
}