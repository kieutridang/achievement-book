import React, { Component } from 'react'
import OnBlurInput from '../../components/OnBlurInput/index.jsx'
import OnBlurTextArea from '../../components/OnBlurTextArea/index.jsx'
import Table from '../../components/Table/index.jsx'
import DateSelection from '../../components/DateSelection/index'

import { Link } from 'react-router-dom'
import { _helper } from '../../components/api/_helper'
import { Redirect } from 'react-router';

import moment from 'moment'

import checkAuthenticate from '../../components/functions/checkAuthenticate';

import './index.scss';

export default class DailyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      quote: '',
      plan: [],
      totalTasks: 0,
      doneTasks: 0,
      note: '',
      authenticate: true
    }
  }
  
  checkAuth = () => {
    checkAuthenticate().then((authenticate) => {
      this.setState({authenticate})
    })
  }

  showTask = (task, index) => {
    const { plan } = this.state;
    return (
      <div
        key={index}
        className={task.process < 100 ? 'task undoneTask' : 'task doneTask'}
      >
        <div>
          <OnBlurTextArea
            default={task.task}
            id={index}
            onBlur={(value, id) => {
              var newPlan = plan.map(task => task);
              newPlan[id].task = value;
              this.updatePlan(newPlan);
            }}
            numRows={"2"}
            maxlength={50}
          />
          <OnBlurInput
            type='number'
            default={task.process}
            id={index}
            conditions={{ min: 0, max: 100 }}
            onBlur={(value, id) => {
              var newPlan = plan.map(task => task);
              newPlan[id].process = value;
              this.updatePlan(newPlan);
            }}
            showPercentage = {true}
          />
        </div>
        { (task.process < 100) && 
          <img 
            src="../../../public/checkmark.png"
            id = {index}
            className={"img"}
            onClick = {(e) => {
              var id = e.target.id;
              var newPlan = plan.map(task => task);
              newPlan[id].process = 100;
              this.updatePlan(newPlan);
            }}
          />
        }
      </div>
    )
  }

  newTask = () => {
    const { plan } = this.state;
    var newPlan = plan.map(task => task);
    newPlan.push({ task: '', process: '0'});
    this.updatePlan(newPlan);
  }

  countDoneTasks = (plan) => {
    let count = 0;
    for (var i = 0; i < plan.length; ++i){
      if (plan[i].process == 100) ++count; 
    }
    return count;
  }

  getDailyPlan = () => {
    const { date } = this.state;
    _helper.fetchGET(
      '/dailyplan/getplan/' + date,
      {}
    )
    .then((response) => {
      const { date, quote, plan, note } = response.data;
      const doneTasks = this.countDoneTasks(plan);
      this.setState({
        quote: quote,
        plan: plan,
        note: note,
        totalTasks: plan.length,
        doneTasks: doneTasks, 
      })
    })
  }

  updatePlan = (newPlan) => {
    this.setState({
      plan: newPlan,
      totalTasks: newPlan.length,
      doneTasks: this.countDoneTasks(newPlan),
    })
    const date = this.state.date;
    _helper.fetchAPI('/dailyplan/updateplan/' + date, {plan: newPlan}, [], "PUT");
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
    const { authenticate, date, quote, plan, note, doneTasks, totalTasks } = this.state;
    if (!authenticate) {
      return (
        <Redirect to={'/users/login'}></Redirect>
      )
    }
    return (
      <div className="container">
        <div className="dayStart">
          <div>
            <h1> Make plan for your day </h1>
            {/* <DateSelection
              date={date}
              handleChange={date => {
                this.setState(
                  {date},
                  () => this.getDailyPlan()
                )
              }}
            /> */}
          </div> 
          <div> 
            <div>
              <div>
                <span>Tasks </span>
                <span>{doneTasks + ' / ' + totalTasks}</span>
              </div>
              <div>
                {
                  plan.map((task, index) => {
                    if (task.process < 100) {
                      return (this.showTask(task,index))
                    }
                  })
                }
                {
                  (totalTasks < 5) && (
                    <div onClick = {this.newTask}>
                      <img src="../../../public/create.png" alt="Create task"/>
                    </div>
                  )
                }
                {
                  plan.map((task, index) => {
                    if (task.process == 100) {
                      return (this.showTask(task, index))
                    }
                  })
                }
              </div>
            </div>
            <div className="note">
              <OnBlurTextArea
                default={note}
                label='Note'
                onBlur={note => this.setState(
                  {note},
                  () => {
                    _helper.fetchAPI('/dailyplan/updateplan/' + date, {note: note}, [], 'PUT')
                  }
                )}
                numRows={6}
              />
            </div>
            {/* <div>
              <Link to='/daily-result'>Daily Result</Link>
              <button onClick={this.logout}>Logout</button>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}
