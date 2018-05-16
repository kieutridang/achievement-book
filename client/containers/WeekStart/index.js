import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../../actions/weekly'
import * as select from '../../selectors/weekly';

import { _helper } from '../../components/api/_helper';

import TaskMission from './components/TaskMission'

class WeekStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2018-05-14'
    };
  }

  componentWillMount = () => {
    this.props.getWeeklyPlan(this.state.date);
  }
  
  _changeTaskName = (value) => {
    alert(value);
  }
  _changeMission = (value, index) => {
    alert(value);
  }
  _changeDescription = (value, index) => {
    alert(value);
  }
  render() {
    const { weeklyPlan } = this.props;
    console.log(weeklyPlan);
    return (
      <TaskMission
        task={{name: 'Hello', description: 'It"s me'}}
        missionList={[{name: 'BB', description: 'bbbb'}, {name: 'CC', description: 'cccc'}]}
        changeTaskName={this._changeTaskName}
        changeMission={this._changeMission}
        changeDescription={this._changeDescription}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  weeklyPlan : select.WeeklyPlanData()
})

const mapDispatchToProps = (dispatch) => ({
  getWeeklyPlan: (date) => dispatch(actions.fetchWeeklyPlan(date)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
)(WeekStart);