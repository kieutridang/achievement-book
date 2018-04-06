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
      date: moment().weekday(0),
      focusedInput: END_DATE,
      startDate: moment(),
      endDate: moment(),
      name: '',
      gender: '',
      city: 'Ho Chi Minh',
      department: [],

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
  componentDidMount = () => {   
    this.getURL();
  }

  render() {

    return (
      <div>
        <MonthPicker
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
        />
      </div>
    )
  }
}


  






