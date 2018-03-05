import React, { Component } from 'react'
import OnBlurInput from '../../components/OnBlurInput/index.jsx'
import TickBar from '../../components/TickBar/index.jsx'
import SingleChoice from '../../components/SingleChoice/index.jsx'
import DateSelection from '../../components/DateSelection/index'

import { Link } from 'react-router-dom'
import { _helper } from '../../components/api/_helper'
import { Redirect } from 'react-router';
import moment from 'moment'

import checkAuthenticate from '../../components/functions/checkAuthenticate';

export default class DailyResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      plan: [],
      taskNumber: 0,
      bestTask: '',
      whyBest: '',
      bestTime: [],
      effciency: 0,
      lessionLearned: '',
      authenticate: true      
    }
  }

  checkAuth = () => {
    checkAuthenticate().then((authenticate) => {
      this.setState({
        authenticate: authenticate
      })
    })
  }
  componentDidMount = () => {
    this.checkAuth();
    this.getDailyResult();
  }

  getDailyResult = () => {
    const { date } = this.state;
    _helper.fetchGET(
      '/dailyplan/getplan/' + date,
      {}
    )
    .then((response) => {
      const { date, plan, bestTask, whyBest, bestTime, effciency, lessionLearned } = response.data;
      this.setState({
        plan: plan,
        bestTask: bestTask,
        whyBest: whyBest,
        bestTime: bestTime,
        effciency: effciency,
        lessionLearned: lessionLearned
      }, () => {
        const { plan } = this.state;
        var count = 0;
        for (var i = 0; i < plan.length; ++i) {
          if (plan[i].process === 100) {
            count++;
          }
        }
        this.setState({taskNumber: count});
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
    const { authenticate, date, taskNumber, bestTask, whyBest, bestTime, efficiency, lessionLearned } = this.state;
    if (!authenticate) {
      return (
        <Redirect to={'/users/login'}></Redirect>
      )
    }
    return (
      <div>
        <div>
          <h1> Daily Result </h1>
          <DateSelection
            date={date}
            handleChange = {date => {
              this.setState(
                {date},
                () => this.getDailyPlan()
              )
            }}
          />
        </div>
        <div>
          <div>
            <label> Number(s) of completed task(s) </label>
            <span> {taskNumber} </span>
          </div>
          <OnBlurInput
            label='Best Completed Task'
            onBlur={bestTask => this.setState(
              {bestTask},
              () => {
                _helper.fetchAPI('/dailyplan/updateplan/' + date, {bestTask: bestTask}, [], 'PUT')
              }
            )}
          />
          <OnBlurInput
            label='Why it is your best task?'
            onBlur={whyBest => this.setState(
              {whyBest},
              () => {
                _helper.fetchAPI('/dailyplan/updateplan/' + date, {whyBest: whyBest}, [], 'PUT')
              }
            )}
          />
          <TickBar
            label='Which times do you work best?'
            selections={['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24']}
            selected={bestTime}
            reqUrl={'/dailyplan/updateplan/' + date}
          />
          <SingleChoice
            label='Which rate of effciency in your task(s)?'
            optionsList={['Low', 'Medium', 'Equivalent', 'Relative', 'High', 'Excellent']}
            onChange = {(effciency) => this.setState(
              {effciency},
              () => {
                var effciencyNumber;
                switch (effciency) {
                  case 'Low':
                    effciencyNumber = 0;
                    break;
                  case 'Medium':
                    effciencyNumber = 1;
                    break;
                  case 'Equivalent':
                    effciencyNumber = 2;
                    break;
                  case 'Relatve':
                    effciencyNumber = 3;
                    break;
                  case 'High':
                    effciencyNumber = 4;
                    break;
                
                  default:
                    effciencyNumber = 5;
                    break;
                }
                _helper.fetchAPI('/dailyplan/updateplan/' + date, {effciency: effciencyNumber}, [], 'PUT')
              }
            )}
          />
        </div>
        <div>
          <OnBlurInput
            label='Lession Learned'
            onBlur={lessionLearned => this.setState(
              {lessionLearned},
              () => {
                _helper.fetchAPI('/dailyplan/updateplan/' + date, {lessionLearned: lessionLearned}, [], 'PUT')
              }
            )}
          />
        </div>
        <div>
          <Link to='/daily-plan'>Daily Plan</Link>
          <button onClick={this.logout}>Logout</button>
        </div>
      </div>
    )
  }
}
