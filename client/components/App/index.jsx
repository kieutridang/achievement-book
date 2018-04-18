import 'react-dates/initialize';
import React, { Component } from 'react';
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

import 'react-dates/lib/css/_datepicker.css';
// import './index.scss';

import {_helper} from '../api/_helper';
import {checkValidate} from '../functions/checkValidate';
import {validations} from '../functions/validations';
import moment from 'moment';

const START_DATE = 'startDate';
const END_DATE = 'endDate';
import { connect } from 'react-redux';
import AddTodo from '../testRedux/index'
import ShowField from '../testRedux/showField'
import NavigationBar from '../NavigationBar/index.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      focusedInput: END_DATE,
      startDate: '',
      endDate: moment(),
      weeklyPlan:[],
      name: '',
      gender: '',
      city: 'Ho Chi Minh',
      department: [],
      schedule:[],
      experience: [],

      showMessage: false,
      date: moment().format('YYYY-MM-DD'),
      url: ''
    }
  }
  getURL = () => {
    const newUrl = window.location.href.split("/")[window.location.href.split("/").length-1];
    this.setState({url: newUrl});
  }

  onDatesChange = ({startDate, endDate}) => {
    this.setState({ startDate, endDate });
  }

  onFocusChange = (focusedInput) => {
    this.setState({
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }

  handleSelect = (date) => {
    this.setState({
      date: date
    })
  }
  getStartDate = () => {
    var firstDay = moment().startOf('week').format('dddd') === 'Sunday' ?     
        moment().startOf('week').add('d',1).format('YYYY-MM-DD') : 
        moment().startOf('week').format('YYYY-MM-DD');
    console.log(firstDay);


  }
  getWeeklyPlan = () => {
    var firstDay = moment().startOf('week').format('dddd') === 'Sunday' ?     
    moment().startOf('week').add('d',1).format('YYYY-MM-DD') : 
    moment().startOf('week').format('YYYY-MM-DD');
    console.log(firstDay);
    _helper.fetchGET(
      '/weeklyplan/getweeklyplan/'+ firstDay,
      {}
    )
    .then((respone) => {
      const {experience, schedule} = respone.data;
      if(respone.status === 200) {
        this.setState({
          experience: experience,
          schedule: schedule
        })
      }

    })
  }
  newExperience = () => {
    const { experience } = this.state;
    var newExperience = experience.map(experience => experience);
    newExperience.push({
      problem  : "" ,
      reason   : "",
      solution: ""
    })
    let {weeklyPlan} = this.state;
    weeklyPlan = {
      experience : newExperience
    }
    console.log(JSON.stringify(weeklyPlan));
    this.updateWeeklyPlan(weeklyPlan);
  }
  newSchedule = () => {
    const { schedule } = this.state;
    var newSchedule = schedule.map(schedule => schedule);
    newSchedule.push({
      mission: ' new mission 3',
      description: '  new schedule desription 3',
      milestones: {
        description: '  milestones desription123456',
        task: 2,
        day: 1
      }
    });
    let {weeklyPlan} = this.state;
    weeklyPlan = {
      schedule : newSchedule
    }
    console.log(JSON.stringify(weeklyPlan));
    this.updateWeeklyPlan(weeklyPlan);
  }
  newWeeklyPlan = () => {
    const { schedule } = this.state;
    var newSchedule = schedule.map(schedule => schedule);
    newSchedule.push({ mission: ' new mission', description: '  new schedule desription', milestones : {
      description: '   new milestones desription',
      task: 2,
      day: 1
    } });
    const { experience } = this.state;
    var newExperience = experience.map(experience => experience);
    newExperience.push({
      problem  : " problem 2" ,
      reason   : "reason 2",
      solution: "solution 2"
    })
    let {weeklyPlan} = this.state;
    weeklyPlan = {
      schedule : newSchedule,
      experience: newExperience
    }
    console.log(JSON.stringify(weeklyPlan));
    this.updateWeeklyPlan(weeklyPlan);
 
  }
  
  updateWeeklyPlan = (weeklyplan) =>{
    var firstDay = moment().startOf('week').format('dddd') === 'Sunday' ?     
    moment().startOf('week').add('d',1).format('YYYY-MM-DD') : 
    moment().startOf('week').format('YYYY-MM-DD');
    _helper.fetchAPI(
      '/weeklyplan/updateweeklyplan/'+ firstDay,
      {schedule : weeklyplan.schedule, experience : weeklyplan.experience},[], 'PUT'
    )
    .then((respone) => {
      const {data, status} = respone;

    })
    this.getWeeklyPlan();

  }
  componentDidMount()  {   
    this.getURL();
    this.getWeeklyPlan();
    this.getStartDate();
  }
  render() {
    const {schedule, experience} = this.state;
    console.log(experience)
    return (
      <div>
        <h1>Experience</h1>
        {experience.map((item) =>
           <label key={item._id}> {item._id}  {item.solution}  </label>
           )}
        <br></br>
        <h1>Schedule</h1>        
        {schedule.map((item) =>
           <label key={item._id}>{item._id} {item.mission}  </label>
           )}
        <button onClick={this.newWeeklyPlan} > new Weekly Plan</button>
        <button onClick={this.newSchedule} > new Schedule</button>
        <button onClick={this.newExperience} > new Experience</button>
        {/* <DatePicker/> */}
        {/* <MonthPicker
          date={this.state.date}
          handleSelect={this.handleSelect}/>
        <NavigationBar url={this.state.url}/>
        <button onClick={() => {
          _helper.fetchGET(
            '/user/userid/5a61f703f29dd3283e449c96',
            [{ 'Content-Type': 'javascript/json' }], )
            .then((response) => {
            })
        }}>
          ClickMe
        </button>
        <Select
          label='City'
          required={true}
          optionsList={[
            'Ho Chi Minh',
            'Ha Noi',
            'Da Nang'
          ]}
          onChange={(city) => this.setState({ city })} />
        <SingleChoice
          label='Gender'
          required={true}
          optionsList={[
            'Male',
            'Female'
          ]}
          message={
            checkValidate.checkSingleChoice(this.state.gender, true, validations.gender)
          }
          showMessage={this.state.showMessage}
          onChange={(gender) => this.setState({ gender })} />
        <MultipleChoice
          label='Department'
          required={true}
          optionsList={[
            { value: 'Student', checked: false },
            { value: 'Teacher', checked: false },
            { value: 'Blahblah', checked: false }
          ]}
          message={
            checkValidate.checkMultipleChoice(this.state.department, true, validations.department)
          }
          showMessage={this.state.showMessage}
          onChange={(department) => this.setState({ department })} />
        <Input
          label='Name'
          required={true}
          onChange={(name) => { this.setState({ name }) }}
          message={checkValidate.checkText(this.state.name, validations.name)}
          showMessage={this.state.showMessage}
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


  






