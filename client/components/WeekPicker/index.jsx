import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment'; 
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';
// import './index.scss';

const START_DATE = 'startDate';
const END_DATE = 'endDate';

export default class WeekPicker extends Component {
    state = {  
        startDate: moment(),
        endDate: moment(),
        focusedInput: END_DATE,
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.handleSelect(moment(startDate.toDate()).weekday(0));
    }

    onFocusChange = (focusedInput) => {
        return;
        this.setState({
            focusedInput: !focusedInput ? START_DATE : focusedInput,
        });
    }

    isOutsideRange = (date) => {
        return date > moment().add(1, 'week').weekday(6);
    }

    onPrevMonthClick = () => {
        const { date } = this.props;
        this.props.handleSelect(moment(date.toDate()).subtract(1, 'month'));
    }

    onMonthClick = () => {
        const { date } = this.props;
        this.props.handleSelect(moment(date.toDate()).add(1, 'month'));
    }

    render() {
        const { date } = this.props;
        const startDate = moment(date.toDate()).weekday(0);
        const endDate = moment(date.toDate()).weekday(6);
        return (
            <DayPickerRangeController
                onDatesChange={this.onDatesChange}
                focusedInput={START_DATE}
                onFocusChange={this.onFocusChange}
                startDate={startDate}
                endDate={endDate}
                enableOutsideDays={true}
                isOutsideRange={this.isOutsideRange}
                daySize={28}
            />
        );
    }
}