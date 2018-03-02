import React, { Component } from 'react'
import OnBlurInput from '../../components/OnBlurInput/index.jsx'
import Table from '../../components/Table/index.jsx'

import { Link } from 'react-router-dom'
import { _helper } from '../../components/api/_helper'

import moment from 'moment'

export default class DailyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().moment().format('YYYY-MM-DD'),
      quote: '',
      plan: [],
      note: ''
    }
  }

  getDailyPlan = () => {
    const { date } = this.state;
    _helper.fetchGET(
      '/dailyplan/getplan/:' + date,
      {}
    )
    .then((response) => {
      const { date, quote, plan, note } = response;
      return this.setState({
        quote: quote,
        plan: plan,
        note: note
      })
    })
  }

  componentWillMount = () => {
    this.getDailyPlan();
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
              default={date}
              type = 'date'
              label = 'Date'
              onBlur = {date => {
                this.setState(
                  {date},
                  this.getDailyPlan()
                )
              }}
            />
            <input type="image" src="../../../public/forward.png" alt="Next" width="48" height="48"/>
          </div>
          <h3> { quote } </h3>
        </div>  
        <div>
          <Table
            label='Tasks Planning'
            reqUrl={'/dailyplan/updateplan/:' + {date}}
          />
        </div>
        <div>
          <OnBlurInput
            label = 'Note'
            onBlur = {note => this.setState(
              {note},
              _helper.fetchAPI('/dailyplan/updateplan/:' + {date}, {note: note}, [], 'PUT')
            )}
          />
        </div>
        <div>
          <Link to='/daily-result'>Daily Result</Link>
        </div>
      </div>
    )
  }
}
