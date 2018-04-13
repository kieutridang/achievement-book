import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import moment from 'moment';

import DayPicker from '../DayPicker/index.jsx';
import WeekPicker from '../WeekPicker/index.jsx';
import MonthPicker from '../MonthPicker/index.jsx';

import './index.scss';

const typeLabel = ['Day', 'Week', 'Month'];
const typeBase = ['day', 'week', 'month'];

export default withRouter(class DatePicker extends Component {
    handleSelect = (date) => {
        const { history, type, page } = this.props;
        // this.props.handleDateChange(date.format("YYYY-MM-DD"));
        const newUrl = '/' + typeBase[type] + '-' + page + '/' + date.format("YYYY-MM-DD");
        history.push({ pathname: newUrl});
    }

    render() {
        const date = moment(this.props.date);
        const { type } = this.props;
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
})


const StyledTabs = styled(Tabs)`
    margin: auto;
    width: 250px;
    background-color: white;
    box-sizing: border-box;
`

