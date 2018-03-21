import React, { Component } from 'react'
import OnBlurInput from '../../components/OnBlurInput/index.jsx'
import TickBar from '../../components/TickBar/index.jsx'
import SingleChoice from '../../components/SingleChoice/index.jsx'
import DateSelection from '../../components/DateSelection/index'
import Select from '../../components/Select/index.jsx'

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
      completedTasksList: [],
      bestTask: '',
      whyBest: '',
      bestTime: [],
      efficiency: -1,
      lessonLearned: '',
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
      const { date, plan, bestTask, whyBest, bestTime, efficiency, lessonLearned } = response.data;
      this.setState({
        plan: plan,
        bestTask: bestTask,
        whyBest: whyBest,
        bestTime: bestTime,
        efficiency: efficiency,
        lessonLearned: lessonLearned
      }, () => {
        const { plan } = this.state;
        var count = 0;
        var newCompletedTasksList = [];
        for (var i = 0; i < plan.length; ++i) {
          if (plan[i].process === 100) {
            count++;
            newCompletedTasksList.push(plan[i].task);
          }
        }
        if (bestTask == '') {
          _helper.fetchAPI('/dailyplan/updateplan/' + date, {bestTask: newCompletedTasksList}, [], 'PUT');
          this.setState({
            completedTasksList: newCompletedTasksList,
            bestTask: newCompletedTasksList[0]
          })
        } else {
          this.setState({
            completedTasksList: newCompletedTasksList
          });
        }
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
    const { authenticate, date, plan, completedTasksList, bestTask, whyBest, bestTime, efficiency, lessonLearned } = this.state;
    if (!authenticate) {
      return (
        <Redirect to={'/users/login'}></Redirect>
      )
    }
    return (
      <div className=".wrapper">
        <div>
          <h1> Review your day </h1>
        </div>
        <div>
          <Select
            label='Which completed task you feel best?'
            optionsList={completedTasksList}
            selectedIndex={completedTasksList.indexOf(bestTask)}
            disabled={completedTasksList.length == 0}
            disabledMessage="You haven't done any task"
            onChange={(bestTask) => this.setState(
              {bestTask},
              () => {
                _helper.fetchAPI('/dailyplan/updateplan/' + date, {bestTask: bestTask}, [], 'PUT')
              }
            )}
          />
          <div>
            <label> Why it is your best task? </label>
            <textarea></textarea>
          </div>
          <TickBar
            label='Which times do you work best?'
            selections={['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24']}
            selected={bestTime}
            reqUrl={'/dailyplan/updateplan/' + date}
          />
          <SingleChoice
            choice={efficiency}
            label='How is the efficiency in your task(s)?'
            optionsList={['Low', 'Medium', 'Equivalent', 'Relative', 'High', 'Excellent']}
            onChange = {(efficiency) => {
              var efficiencyNumber;
              switch (efficiency) {
                case 'Low':
                  efficiencyNumber = 0;
                  break;
                case 'Medium':
                  efficiencyNumber = 1;
                  break;
                case 'Relative':
                  efficiencyNumber = 2;
                  break;
                case 'High':
                  efficiencyNumber = 3;
                  break;
              
                default:
                  efficiencyNumber = 4;
                  break;
              }
              this.setState(
                {efficiency: efficiencyNumber},
                () => {
                _helper.fetchAPI('/dailyplan/updateplan/' + date, {efficiency: efficiencyNumber}, [], 'PUT')
                }
              )
            }}
          />
        </div>
        <div>
          <label> What have you learned through this day? </label>
          <textarea></textarea>
        </div>
      </div>
    )
  }
}
