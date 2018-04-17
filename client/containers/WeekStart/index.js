import React, { Component } from 'react';

import TaskMission from './components/TaskMission'

export default class WeekStart extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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