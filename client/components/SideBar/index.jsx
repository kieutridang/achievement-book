import React, {Component} from 'react';
import DateSelection from '../DateSelection/index';

import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import { _helper } from '../../components/api/_helper'
import checkAuthenticate from '../../components/functions/checkAuthenticate';

import './index.scss';


export default class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticate: true,
        }
    }
    checkAuth = () => {
        checkAuthenticate().then((authenticate) => {
            debugger
            this.setState({ authenticate })
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
        const { date } = this.props;
        const { authenticate } = this.state;
        if (!authenticate) {
            return (
                <Redirect to={'/users/login'}></Redirect>
            )
        }
        return (
            <div className="SideBar">
                <DateSelection
                    date={date}
                    handleChange={date => this.props.handleDateChange(date)}
                />
                <div>
                    <Link to='/daily-result'>Daily Result</Link>
                    <button onClick={this.logout}>Logout</button>
                </div>
            </div>
        );
    }
}