import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskMission from './components/TaskMission'
import OnBlurTextArea from '../../components/OnBlurTextArea/index.jsx'
import Mission from './components/Mission'
import { addWeeklyMission } from './action';
import { debug } from 'util';

class WeekStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: 'Hello',
      missionList: [{name: 'Hello', description: 'Kakaka'}],
      taskList: [{name: 'Hello', description: "It'me", mission:''}],
    };
  }
  _changeTaskName = (value, index) => {
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
    //const { goal, missionList, taskList } = this.props.weeklyData;
    debugger
    const { missions } = this.props.weeklyData;
    const { _addMission,  _changeMissionName } = this.props;
    const { goal, taskList } = this.state;
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

const mapStateToProps = (state) => {
   return {
     weeklyData: state.weeklyData,
   }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _addMission: () => dispatch(addWeeklyMission),
    _changeMissionName: () => dispatch(changeMissionName(value, index)),
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekStart);