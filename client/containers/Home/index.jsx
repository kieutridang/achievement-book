import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/index.jsx';

import { _helper } from '../../components/api/_helper';
import checkAuthenticate from '../../components/functions/checkAuthenticate';
import NavigationBar from '../../components/NavigationBar/index.jsx';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticate: checkAuthenticate(),
            showMessage: false,
            message: "",
            user: {}
        }
    }
    componentDidMount = () => {
        this.checkAuth()
        this.getUser()
    }
    getURL = () => {
        const newUrl = window.location.href.split("/")[window.location.href.split("/").length-1];
        return newUrl;
    }
    getUser(){
        _helper.fetchGET(
          '/user/getuser',
          {}
        )
        .then((response) => {
            const {data, status} = response;
            if(status == 200 ) {
                this.setState({user: data})
            }  
        })
      }
    checkAuth = () => {
        checkAuthenticate().then((authenticate) => {
            this.setState({
                authenticate: authenticate
            })
        })
    }
    logout = () => {
        _helper.fetchAPI(
            "/user/logout",
            {}
        )
        .then((response) => {
            if (response) {
                const { data, status } = response;
                if (status == 200) {
                    this.checkAuth()
                }
            }
        })
    }
    render() {
        const {authenticate, message, showMessage } = this.state
        if (!authenticate) {
            return (
                <Redirect to={'/users/login'}></Redirect>
            )
        }
        return (
            <div>
                <NavigationBar authenticate={this.state.authenticate} url={this.getURL()} user={this.state.user}/>
                <h1>Logged in successfully</h1>
                <div><Link to='/daily-plan'>Daily Plan</Link></div>
                <div><Link to='/daily-result'>Daily Result</Link></div>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}
