import React, { Component } from 'react';
import { connect } from 'react-redux';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../../actions/weekly'
import * as select from '../../selectors/weekly';

import { _helper } from '../../components/api/_helper';

import TaskMission from './components/TaskMission'
import OnBlurTextArea from '../../components/OnBlurTextArea/index.jsx'
import Mission from './components/Mission'
import { addWeeklyMission } from './action';
import { debug } from 'util';

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
  _changeTaskMission = (value, index) => {
    alert(value);
  }
  _changeDescription = (value, index) => {
    alert(value);
  }
  _changeMissionName = (value, index) => {
    alert(value);
  }
  _addMission = () => {
    
  }
  _addTask = () => {
    
  }
  render() {
    const { weeklyPlan } = this.props;
    console.log(weeklyPlan);
    return (
      <div>
        <h1>Make plan for your week</h1>
        <OnBlurTextArea
          label="Set your goal"
          default={"test"}
          numRows={4}
        />
        <div>
          {
            missionList && missionList.map((mission, index) => {
              return (
                <Mission
                  index={index}
                  mission={mission}
                  changeMissionName={_changeMissionName}
                  changeMissionDescription={this._changeMissionDescription}
                />
              );
            })
          }
          <button onClick={_addMission}>Add Mission</button>
        </div>
        <div>
          {
            taskList && taskList.map((task, index) => {
              return (
                <TaskMission
                task={task}
                missionList={missionList}
                changeTaskName={this._changeTaskName}
                changeMission={this._changeMission}
                changeDescription={this._changeDescription}
                />
              );
            })
          }
          <button onClick={this._addTask}>Add Task</button>
        </div>
      </div>
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