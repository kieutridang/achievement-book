import React from 'react';
import Input from '../Input/Input.jsx';
import './SignUp.scss'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            info: {
                username: '',
                password1: '',
                password2: ''
            },
            validate: {
                username: false,
                password1: false,
                password2: false
            },
            status: '',
            checkAuth: false
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
                changeState('checkAuth', true);
              } else {
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
            <Redirect to={'/registration'}/>
          )
        }
        return (
            <div className='SignUp'>
                <h1>Sign Up</h1>
                <Input
                    type="text"
                    label="Username"
                    property="username"
                    validateAndMessage={[
                        { regExp: '^.{0,5}$', message: 'Your name is at least 6 character', valid: false }
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.username}
                ></Input>
                <Input
                    type="password"
                    label="Password"
                    property="password1"
                    validateAndMessage={[
                        { regExp: '^.{0,5}$', message: 'Your password is at least 6 characters', valid: false }
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.password1}
                ></Input>
                <Input
                    type="password"
                    label="Confirm password"
                    property="password2"
                    validateAndMessage={[
                    ]}
                    changeHandle={this._changHandle}
                    validate={this.state.validate.password2}
                ></Input>
                { (this.state.info.password1 != this.state.info.password2) && 
                    <p>2 passwords must be the same</p>
                }
                {(this.state.status != '') &&
                    <p>{this.state.status}</p>
                }
                <div>
                    <button onClick = {this.submit}>Sign Up</button>
                    <Link to='/login'>
                        <button>Log In</button>
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
        })
    }
    checkValidate = () => {
        const validate = this.state.validate;
        const info = this.state.info;

        for (let key in validate){
            if (!validate[key]) return false;    
        }
        if (info.password1 !=  info.password2) return false;
        return true;
    }
    handleStatus = (status) => {
        let message = 'Registered Successfully';
        if (status === 1) message = 'Username existed';
        console.log(status);
        this.setState({
            status: message
        })
    }
    submit = () => {
        let handleStatus = this.handleStatus;
        if (!this.checkValidate()) return;
        let userInfo = {
            username: this.state.info.username,
            password: this.state.info.password1
        };

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        debugger
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (xhr.status === 400) handleStatus(1);
                else handleStatus(2);
            }
        });

        xhr.open("POST", "http://localhost:8080/api/signup");
        xhr.send(JSON.stringify(userInfo));
    }
}