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
import SlideTab from '../SlideTab/index.jsx';

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
      data: {
        Problem: 'Duy',
        Cause: 'Huy',
        Solution: 'Thuc',
      },
    }
  }

  handleChange = (value, label) => {
    let newData = {};
    const { data } = this.state;
    Object.keys(this.state.data).forEach((key) => {newData[key] = data[key]})
    newData[label] = value;
    this.setState({
      data: newData,
    })
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <DatePicker/>
        <SlideTab
          data={data}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}


  






