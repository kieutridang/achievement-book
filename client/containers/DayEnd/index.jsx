import React, { Component } from 'react'
import OnBlurInput from '../../components/OnBlurInput/index.jsx'
import TickBar from '../../components/TickBar/index.jsx'
import SingleChoice2 from '../../components/SingleChoice2/index.jsx'
import DateSelection from '../../components/DateSelection/index'
import Select from '../../components/Select/index.jsx'
import SideBar from '../../components/SideBar/index.jsx'
import EditableP from '../../components/EditableP/index.jsx'

import { Link } from 'react-router-dom'
import { _helper } from '../../components/api/_helper'
import { Redirect } from 'react-router';
import moment from 'moment'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css'

import './index.scss'

import checkAuthenticate from '../../components/functions/checkAuthenticate';
import NavigationBar from '../../components/NavigationBar/index.jsx';

export default class DailyResult extends Component {
  constructor(props) {
    super(props);
    this.timeOut = 0;
    this.state = {
      date: props.match.params.date || moment().format('YYYY-MM-DD'),
      plan: [],
      completedTasksList: [],
      bestTask: '',
      whyBest: '',
      bestTime: [],
      efficiency: -1,
      lessonLearned: '',
      blockingUI: true,
      showSidebar: false,
      user:{}
    }
  }

  checkAuth = () => {
    const { history } = this.props;
    checkAuthenticate().then((authenticate) => {
      if (!authenticate) {
        history.replace('/users/login');
      }
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
      if (response.status == 200) {
        const { date, plan, bestTask, whyBest, bestTime, efficiency, lessonLearned } = response.data;
        var count = 0;
        var newCompletedTasksList = [];
        for (var i = 0; i < plan.length; ++i) {
          if (plan[i].process === 100) {
            count++;
            newCompletedTasksList.push(plan[i].task);
          }
        }
        if (bestTask == '') {
          _helper.fetchAPI('/dailyplan/updateplan/' + date, { bestTask: newCompletedTasksList[0] }, [], 'PUT');
          this.setState({
            plan: plan,
            bestTask: newCompletedTasksList[0],
            whyBest: whyBest,
            bestTime: bestTime,
            efficiency: efficiency,
            lessonLearned: lessonLearned,
            completedTasksList: newCompletedTasksList,
            blockingUI: false
          });
        } else {
          this.setState({
            plan: plan,
            bestTask: bestTask,
            whyBest: whyBest,
            bestTime: bestTime,
            efficiency: efficiency,
            lessonLearned: lessonLearned,
            completedTasksList: newCompletedTasksList,
            blockingUI: false
          });
        }
      }
    })
  }

  handleDateChange = (date) => {
    const { history } = this.props;
    history.push({ pathname: '/dailyplan/getplan/' + date });
    // this.setState({date},
    //   () => this.getDailyResult()
    // )
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
    return (
      <BlockUi tag="div" blocking={this.state.blockingUI} message="Please wait" keepInView>
        <NavigationBar authenticate={this.state.authenticate} user={this.state.user}
          date={date}
          type={0}
          handleDateChange={this.handleDateChange}
          page='result'
        />
        <div className="wrapper">
          <div className=""></div>
          <div>
            <SideBar
              date={date}
              type={0}
              handleDateChange={this.handleDateChange}
            />
        <div>
            <div className="dayEnd">
              <div>
                <h1> Review your day </h1>
              </div>
              <div>
                <Select
                  label='Which completed task you feel best?'
                  optionsList={completedTasksList}
                  selectedValue={bestTask}
                  disabled={completedTasksList.length == 0}
                  disabledMessage="You haven't done any task"
                  onChange={(bestTask) => this.setState(
                    { bestTask },
                    () => {
                      _helper.fetchAPI('/dailyplan/updateplan/' + date, { bestTask: bestTask }, [], 'PUT')
                    }
                  )}
                />
                <div className="why-best">
                  <label className='page-label'> Why it is your best task? </label>
                  <div>
                    <EditableP
                      editable={completedTasksList.length > 0}
                      defaultValue={completedTasksList.length > 0 ? whyBest : "You haven't done any task"}
                      handleChange={whyBest => this.setState(
                        { whyBest },
                        () => {
                          _helper.fetchAPI('/dailyplan/updateplan/' + date, { whyBest: whyBest }, [], 'PUT')
                        }
                      )}
                      maxlength={200}
                    />
                  </div>
                </div>
                <div>
                  <label className='page-label'> Which times do you work best? </label>
                  <div className='day-night-symbol'>
                    <img src='../../../public/moon.png' />
                    <img src='../../../public/sun-hand-drawn-symbol_318-52061.jpg' />
                  </div>
                  <TickBar
                    label={null}
                    selections={['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24']}
                    selected={bestTime}
                    onChange={bestTime => this.setState(
                      { bestTime },
                      () => {
                        _helper.fetchAPI('/dailyplan/updateplan/' + date, { bestTime: bestTime }, [], "PUT")
                      }
                    )}
                  />
                </div>
              </div>
              <div className="lesson-learned">
                <label className='page-label'> What have you learned through this day? </label>
                <div>
                  <EditableP
                    defaultValue={lessonLearned}
                    handleChange={lessonLearned => this.setState(
                      { lessonLearned },
                      () => {
                        _helper.fetchAPI('/dailyplan/updateplan/' + date, { lessonLearned: lessonLearned }, [], 'PUT')
                      }
                    )}
                    maxlength={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </BlockUi>
    )
  }
}
