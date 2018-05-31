import React, { Component } from 'react'
import OnBlurInput from '../../components/OnBlurInput/index.jsx'
import OnBlurTextArea from '../../components/OnBlurTextArea/index.jsx'
import Table from '../../components/Table/index.jsx'
import DateSelection from '../../components/DateSelection/index'
import SideBar from '../../components/SideBar/index.jsx'
import EditableP from '../../components/EditableP/index.jsx'
import { Link } from 'react-router-dom'
import { _helper } from '../../components/api/_helper'
import { Redirect } from 'react-router';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css'

import moment from 'moment'

import checkAuthenticate from '../../components/functions/checkAuthenticate';

import './index.scss';
import NavigationBar from '../../components/NavigationBar/index.jsx';


export default class DailyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.match.params.date || moment().format('YYYY-MM-DD'),
      quote: '',
      plan: [],
      totalTasks: 0,
      doneTasks: 0,
      note: '',
      blockingUI: true,
      showSidebar: false,
      username: '',
      user: {},
    }
  }

  checkAuth = () => {
    const { history } = this.props;
    checkAuthenticate().then((authenticate) => {
      if (!authenticate){
        history.replace('/users/login');
      }
    })
  }

  checkValidValue = (value) => {
    const { type } = this.props;
    if ((!type || type == 'text') && value.split(' ').join('').split('\n').join('') == '') {
      return false;
    }
    return true;
  }

  showTask = (task, index) => {
    const { plan, date } = this.state;
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
              if (!this.checkValidValue(task.task)) {
                newPlan[id].process = 0;
              }
              this.updatePlan(newPlan);
            }}
            numRows={"2"}
            maxlength={50}
          />
          <OnBlurInput
            type='number'
            default={task.process || '0'}
            id={index}
            conditions={{ min: 0, max: 100 }}
            onBlur={(value, id) => {
              var newPlan = plan.map(task => task);
              newPlan[id].process = value;
              this.updatePlan(newPlan);
            }}
            showPercentage={true}
            disabled={!this.checkValidValue(task.task)}
          />
        </div>
        {(task.process < 100) &&
          <img
            src="../../../public/checkmark.png"
            id={index}
            className={"img"}
            onClick={(e) => {
              if (!this.checkValidValue(task.task)) return;
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

  handleDateChange = (date) => {
    const { history } = this.props;
    history.push({pathname: '/dailyplan/getplan/' + date});
    // this.setState({ date },
    //   () => this.getDailyPlan()
    // )
  }

  newTask = () => {
    const { plan } = this.state;
    var newPlan = plan.map(task => task);
    newPlan.push({ task: '', process: '0' });
    this.updatePlan(newPlan);
  }

  countDoneTasks = (plan) => {
    let count = 0;
    for (var i = 0; i < plan.length; ++i) {
      if (plan[i].process == 100)++count;
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
      if (response.status == 200){
        const doneTasks = this.countDoneTasks(plan);
        this.setState({
          quote: quote,
          plan: plan,
          note: note,
          totalTasks: plan.length,
          doneTasks: doneTasks,
          blockingUI: false,
        })
      }
    })
  }

  updatePlan = (newPlan) => {
    this.setState({
      plan: newPlan,
      totalTasks: newPlan.length,
      doneTasks: this.countDoneTasks(newPlan),
    })
    const date = this.state.date;
    _helper.fetchAPI('/dailyplan/updateplan/' + date, { plan: newPlan }, [], "PUT");
  }

  componentDidMount = () => {
    this.checkAuth();
    this.getDailyPlan();
  }

  render() {
    const { date, quote, plan, note, doneTasks, totalTasks } = this.state;
    return (
      <BlockUi tag="div" blocking={this.state.blockingUI} message="Please wait" keepInView>
        <NavigationBar 
          date={date}
          type={0}
          handleDateChange={this.handleDateChange}
          page='plan'
        />
        <div className="container">
          <div className=""></div>
          <div>
            <SideBar
              date={date}
              type={0}
              handleDateChange={this.handleDateChange}
              page='plan'
            />
            <div className="dayStart">
              <div>
                <h1> Make plan for your day </h1>
              </div>
              <div className="taskAndNote">
                <div>
                  <div>
                    <span>Tasks </span>
                    <span>{doneTasks + ' / ' + totalTasks}</span>
                  </div>
                  <div>
                    {
                      plan.map((task, index) => {
                        if (task.process < 100) {
                          return (this.showTask(task, index))
                        }
                      })
                    }
                    {
                      (totalTasks < 5) && (
                        <div onClick={this.newTask} className={'newTask'}>
                          <img src="../../../public/create.png" alt="Create task" />
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
                  <label>Note</label>
                  <div>
                    <EditableP
                      defaultValue={note}
                      handleChange={note => this.setState(
                        { note },
                        () => {
                          _helper.fetchAPI('/dailyplan/updateplan/' + date, { note: note }, [], 'PUT')
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
