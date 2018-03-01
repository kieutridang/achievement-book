import React, { Component } from 'react'
import OnBlurInput from '../../components/OnBlurInput/index.jsx'
import TickBar from '../../components/TickBar/index.jsx'

import { Link } from 'react-router-dom'

export default class DailyResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bestTask: '',
      whyBest: '',
      lessionLearned: ''      
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1> Daily Result </h1>
          <div>
            <input type="image" src="../../../public/backward.png" alt="Back" width="48" height="48"/>
            <OnBlurInput
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
            <span> number </span>
          </div>
          <OnBlurInput
            label='Best Completed Task'
            onBlur={bestTask => this.setState({bestTask})}
          />
          <OnBlurInput
            label='Why it is your best task?'
            onBlur={whyBest => this.setState({whyBest})}
          />
          <TickBar
            label='Which times do you work best?'
            selections={['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24']}
          />
          <TickBar
            label='Which are your most efficient times?'
            selections={['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24']}
          />
        </div>
        <div>
          <OnBlurInput
            label='Lession Learned'
            onBlur={lessionLearned => this.setState({lessionLearned})}
          />
        </div>
        <div>
          <Link to='/daily-plan'>Daily Plan</Link>
        </div>
      </div>
    )
  }
}
