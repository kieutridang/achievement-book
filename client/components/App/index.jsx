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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().weekday(0),
      focusedInput: END_DATE,
      startDate: moment(),
      endDate: moment(),
    }
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

  render() {
    return (
      <div>
        <MonthPicker
          date={this.state.date}
          handleSelect={this.handleSelect}
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
