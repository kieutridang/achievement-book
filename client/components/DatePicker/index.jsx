import React, { Component } from 'react';
import styled from 'styled-components';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import moment from 'moment';

import DayPicker from '../DayPicker/index.jsx';
import WeekPicker from '../WeekPicker/index.jsx';
import MonthPicker from '../MonthPicker/index.jsx';

import './index.scss';

export default class DatePicker extends Component {
    state = { }

    handleSelect = (date) => {
        this.props.handleDateChange(date.format("YYYY-MM-DD"));
    }

    render() {
        const date = moment(this.props.date);
        return (
            <StyledTabs>
                <TabList>
                    <Tab>Day</Tab>
                    <Tab>Week</Tab>
                    <Tab>Month</Tab>
                </TabList>

                <TabPanel>
                    <DayPicker
                        date={date}
                        handleSelect={this.handleSelect}
                    />
                </TabPanel>
                <TabPanel>
                    <WeekPicker
                        date={date}
                        handleSelect={this.handleSelect}
                    />
                </TabPanel>
                <TabPanel>
                    <MonthPicker
                        date={date}
                        handleSelect={this.handleSelect}
                    />
                </TabPanel>

            </StyledTabs>
        );
    }
}


const StyledTabs = styled(Tabs)`
    width: 200px;
    background-color: white;
    box-sizing: border-box;
`

