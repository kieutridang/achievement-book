import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/index.jsx';
import { _helper } from '../../components/api/_helper';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticate: false,
            showMessage: false,
            message: ""
        }
    }
    checkAuth = () => {
        _helper.fetchGET(
            '/user/checkAuthenticate',
            {
            }
        ).then((response) => {
            if (response) {
                const { data, status } = response;
                if (status == 200) {
                    this.setState({
                        authenticate: true
                    })
                }
                else {
                    this.setState({
                        authenticate: false
                    })
                }
            }
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
                    alert(status);
                    if (status == 200) {
                        this.checkAuth()
                    }
                    else {
                        this.setState({
                            showMessage: true,
                            message: data
                        })
                    }
                }
            })
    }
    componentWillMount = () => {
        this.checkAuth()
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
                <h1>Logged in successfully</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}
