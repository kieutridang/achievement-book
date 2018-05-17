import 'react-dates/initialize';
import React, { Component } from 'react';
import { withFormik } from 'formik';

import Button from '../Button/index.jsx';
import Select from '../Select/index.jsx';
import SingleChoice from '../SingleChoice/index.jsx';
import MultipleChoice from '../MultipleChoice/index.jsx';
import Input from '../Input/index.jsx';
import UploadImage from '../UploadImage/index.jsx';
import DateSelection from '../DateSelection/index';
import { SingleDatePicker, DayPickerRangeController, DateRangePicker } from 'react-dates';
import MonthPicker from '../MonthPicker/index.jsx';
import WeekPicker from '../WeekPicker/index.jsx';
import DayPicker from '../DayPicker/index.jsx';
import DatePicker from '../DatePicker/index.jsx';
import WeekStart from '../../containers/WeekStart/index'
import SlideTab from '../SlideTab/index.jsx';
import OnBlurInput from '../OnBlurInput2/index.jsx';

import 'react-dates/lib/css/_datepicker.css';
// import './index.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions'
import * as select from './selector';

import { _helper } from '../api/_helper';
import { checkValidate } from '../functions/checkValidate';
import { validations } from '../functions/validations';
import moment from 'moment';

const START_DATE = 'startDate';
const END_DATE = 'endDate';

import AddTodo from '../testRedux/index'
import ShowField from '../testRedux/showField'
import NavigationBar from '../NavigationBar/index.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().weekday(0),
      data: {
        Problem: 'Duy',
        Cause: 'Huy',
        Solution: 'Thuc',
      },
      weeklyPlan: [],
      name: '',
      gender: '',
      city: 'Ho Chi Minh',
      department: [],
      missions: [],
      days: [],
      updateDay: 0
    }
  }

  getWeeklyPlan = () => {
    var firstDay = moment().startOf('week').format('dddd') === 'Sunday' ?
      moment().startOf('week').add('d', 1).format('YYYY-MM-DD') :
      moment().startOf('week').format('YYYY-MM-DD');
    console.log(firstDay);
    _helper.fetchGET(
      '/weeklyplan/' + firstDay,
      {}
    )
      .then((respone) => {
        const { missions, days } = respone.data;
        if (respone.status === 200) {
          this.setState({
            missions: missions,
            days: days
          })
        }

      })
  }
  newExperience = () => {
    const { experience } = this.state;
    var newExperience = experience.map(experience => experience);
    newExperience.push({
      problem: "",
      reason: "",
      solution: ""
    })
    let { weeklyPlan } = this.state;
    weeklyPlan = {
      experience: newExperience
    }
    console.log(JSON.stringify(weeklyPlan));
    this.updateWeeklyPlan(weeklyPlan);
  }
  newMission = () => {
    const { missions } = this.state;
    var newMission = missions.map(mission => mission);
    newMission.push({
      name: ' new mission',
      description: '  new schedule desription ',
    });
    let { weeklyPlan } = this.state;
    weeklyPlan = {
      missions: newMission
    }
    console.log(JSON.stringify(weeklyPlan));
    this.updateWeeklyPlan(weeklyPlan);
  }
  newDays = () => {
    const { days } = this.state;
    var newDays = days.map(day => day);
    newDays.push({
      milestones: {
        name: ' name day',
        description: '   new milestones desription',
        mission: 1
      }
    });
    let { weeklyPlan } = this.state;
    weeklyPlan = {
      days: newDays,
    }
    console.log(JSON.stringify(weeklyPlan));
    this.updateWeeklyPlan(weeklyPlan);

  }

  updateWeeklyPlan = (weeklyplan) => {
    var firstDay = moment().startOf('week').format('dddd') === 'Sunday' ?
      moment().startOf('week').add('d', 1).format('YYYY-MM-DD') :
      moment().startOf('week').format('YYYY-MM-DD');
    _helper.fetchAPI(
      '/weeklyplan/' + firstDay,
      { days: weeklyplan.days, missions: weeklyplan.missions }, [], 'PUT'
    )
      .then((respone) => {
        const { data, status } = respone;

      })
    this.getWeeklyPlan();

  }
  handleChange = (value, label) => {
    let newData = {};
    const { data } = this.state;
    Object.keys(this.state.data).forEach((key) => { newData[key] = data[key] })
    newData[label] = value;
    this.setState({
      data: newData,
    })
  }
  componentDidMount() {
    this.getWeeklyPlan();
    this.props._getWeeklyPlan(moment().format('YYYY-MM-DD'));
  }

  render() {
    const { missions, days } = this.state;
    const { data } = this.state;
    console.log(this.props.weeklyPlan)
    return (
      <div>           
        <DatePicker/>
        <SlideTab
          data={data}
          handleChange={this.handleChange}
        />
        <WeekPicker
          date={this.state.date}
          handleSelect={this.handleSelect}
        />
        <DayPicker
          date={this.state.date}
          handleSelect={this.handleSelect}
        /> */}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector ({
  weeklyPlan : select.WeeklyPlanData()

})
// const mapStateToProps =ư (state) => {
//   console.log(state)
//   return {
//     weeklyPlan: state.get('data')
//   }
// }
const mapDispatchToProps = (dispatch) => ({
  _getWeeklyPlan: (date) => dispatch(actions.fetchWeeklyPlan(date)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withRedux,
)(App);









