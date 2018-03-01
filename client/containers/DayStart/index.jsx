import React, { Component } from 'react'
import OnBlurInput from '../../components/OnBlurInput/index.jsx'
import Table from '../../components/Table/index.jsx'

import { Link } from 'react-router-dom'

export default class DailyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      quote: '',
      plan: [],
      note: ''
    }
  }

  render() {
    const { date, quote, plan, note } = this.state
    return (
      <div>
        <div>
          <h1> Daily Plan </h1>
          <div>
            <input type="image" src="../../../public/backward.png" alt="Back" width="48" height="48"/>
            <OnBlurInput
              type = 'date'
              label = 'Date'
              onBlur = {date => this.setState({date})}
            />
            <input type="image" src="../../../public/forward.png" alt="Next" width="48" height="48"/>
          </div>
          <h3> { quote } </h3>
        </div>  
        <div>
          <Table
            label='Tasks Planning'
          />
        </div>
        <div>
          <OnBlurInput
            label = 'Note'
            onBlur = {note => this.setState({note})}
          />
        </div>
        <div>
          <Link to='/daily-result'>Daily Result</Link>
        </div>
      </div>
    )
  }
}
