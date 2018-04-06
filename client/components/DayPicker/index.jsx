import React, {Component} from 'react';
import moment from 'moment';
import 'react-dates/initialize';

import { DayPickerSingleDateController } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';

export default class DayPicker extends Component {
    state = {  }

    onDateChange = (date) => {
        this.props.handleSelect(date);
    }

    onPrevMonthClick = () => {
        const { date } = this.props;
        this.props.handleSelect(moment(date.toDate()).subtract(1, 'month'));
    }

    onNextMonthClick = () => {
        const { date } = this.props;
        this.props.handleSelect(moment(date.toDate()).add(1, 'month'));
    }

    render() {
        const { date } = this.props;
        return (
            <DayPickerSingleDateController
                onDateChange={this.onDateChange}
                date={date}
                enableOutsideDays={true}
            />
        );
    }
}