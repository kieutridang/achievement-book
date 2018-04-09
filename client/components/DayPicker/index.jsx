import React, {Component} from 'react';
import moment from 'moment';
import 'react-dates/initialize';

import { DayPickerSingleDateController } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';

export default class DayPicker extends Component {
    state = {  }

    onDateChange = (date) => {
        this.props.handleSelect(moment(date.toDate()));
    }

    isOutsideRange = (date) => {
        return date > moment().add(1, 'days');
    }

    render() {
        const { date } = this.props;
        return (
            <DayPickerSingleDateController
                focused={true}
                onDateChange={this.onDateChange}
                date={date}
                enableOutsideDays={true}
                isOutsideRange={this.isOutsideRange}
            />
        );
    }
}