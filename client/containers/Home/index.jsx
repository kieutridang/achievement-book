import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment'
import Button from '../../components/Button/index.jsx';

import { _helper } from '../../components/api/_helper';
import checkAuthenticate from '../../components/functions/checkAuthenticate';
import NavigationBar from '../../components/NavigationBar/index.jsx';
import './index.scss'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.match.params.date || moment().format('YYYY-MM-DD'),
            authenticate: checkAuthenticate(),
            showMessage: false,
            message: "",
            user: {}
        }
    }
    
    handleDateChange = (date) => {
        const { history } = this.props;
        history.push({pathname: '/day-plan/' + date});
        // this.setState({ date },
        //   () => this.getDailyPlan()
        // )
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
        const { history } = this.props;
        checkAuthenticate().then((authenticate) => {
            if (!authenticate){
                history.replace('/users/login');
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
                if (status == 200) {
                    this.checkAuth()
                }
            }
        })
    }
    render() {
        const {message, showMessage, date } = this.state
        return (
            <div>
                <NavigationBar url={this.getURL()} user={this.state.user}
                  date={date}
                  type={0}
                  handleDateChange={this.handleDateChange}
                  page='plan'
                  />
                <div className='content' >
                    <h1>Logged in successfully</h1>
                    <div><Link to='/day-plan'>Daily Plan</Link></div>
                    <div><Link to='/day-result'>Daily Result</Link></div>
                    <button onClick={this.logout}>Logout</button>
                </div>
            </div>
        )
    }
}
