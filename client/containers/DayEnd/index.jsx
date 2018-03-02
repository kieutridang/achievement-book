import React, { Component } from 'react'
import OnBlurInput from '../../components/OnBlurInput/index.jsx'
import TickBar from '../../components/TickBar/index.jsx'
import SingleChoice from '../../components/SingleChoice/index.jsx'

import { Link } from 'react-router-dom'

export default class DailyResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      taskNumber: new Number(),
      bestTask: '',
      whyBest: '',
      lessionLearned: ''      
    }
  }

  getDailyResult = () => {
    const { date } = this.state;
    _helper.fetchGET(
      '/dailyplan/getplan/' + date,
      {}
    )
    .then((response) => {
      const { date, plan, bestTask, whyBest, bestTime, effciency, lessionLearned } = response;
      return this.setState({
        bestTask: bestTask,
        whyBest: whyBest,
        bestTime: bestTime,
        effciency: effciency,
        lessionLearned: lessionLearned
      }, () => {
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

  componentWillMount = () => {
    this.getDailyPlan();
  }

  render() {
    const { date, taskNumber, bestTask, whyBest, lessionLearned } = this.state;
    return (
      <div>
        <div>
          <h1> Daily Result </h1>
          <div>
            <input type="image" src="../../../public/backward.png" alt="Back" width="48" height="48"/>
            <OnBlurInput
              default = {date}
              type = 'date'
              label = 'Date'
              onBlur = {date => this.setState({date})}
            />
            <input type="image" src="../../../public/forward.png" alt="Next" width="48" height="48"/>
          </div>
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
            label='Which are your most efficient times?'
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
        </div>
      </div>
    )
  }
}
