import React, { Component } from 'react'
import OnBlurInput from '../../components/OnBlurInput/index.jsx'
import Table from '../../components/Table/index.jsx'
import DateSelection from '../../components/DateSelection/index'

import { Link } from 'react-router-dom'
import { _helper } from '../../components/api/_helper'
import { Redirect } from 'react-router';

import moment from 'moment'

import checkAuthenticate from '../../components/functions/checkAuthenticate';

export default class DailyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      quote: '',
      plan: [],
      note: '',
      authenticate: true
    }
  }
  
  checkAuth = () => {
    checkAuthenticate().then((authenticate) => {
      this.setState({authenticate})
    })
  }

  getDailyPlan = () => {
    const { date } = this.state;
    _helper.fetchGET(
      '/dailyplan/getplan/' + date,
      {}
    )
    .then((response) => {
      const { date, quote, plan, note } = response.data;
      this.setState({
        quote: quote,
        plan: plan,
        note: note
      })
    })
  }

  componentDidMount = () => {
    this.checkAuth();
    this.getDailyPlan();
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
    const { authenticate, date, quote, plan, note } = this.state
    if (!authenticate) {
      return (
        <Redirect to={'/users/login'}></Redirect>
      )
    }
    return (
      <div>
        <div>
          <h1> Daily Plan </h1>
          <DateSelection
            date={date}
            handleChange={date => {
              this.setState(
                {date},
                () => this.getDailyPlan()
              )
            }}
          />
          <h3> { quote } </h3>
        </div>  
        <div>
          <Table
            label='Tasks Planning'
            reqUrl={'/dailyplan/updateplan/' + date}
            rows={plan}
          />
        </div>
        <div>
          <OnBlurInput
            default={note}
            label='Note'
            onBlur={note => this.setState(
              {note},
              () => {
                _helper.fetchAPI('/dailyplan/updateplan/' + date, {note: note}, [], 'PUT')
              }
            )}
          />
        </div>
        <div>
          <Link to='/daily-result'>Daily Result</Link>
          <button onClick={this.logout}>Logout</button>
        </div>
      </div>
    )
  }
}
