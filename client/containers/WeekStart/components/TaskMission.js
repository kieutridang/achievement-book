import React, { Component } from 'react';

import OnBlurInput from '../../../components/OnBlurInput/index.jsx';
import OnBlurArea from '../../../components/OnBlurTextArea/index.jsx';


const TaskMission = ({ index, task, changeTaskName, changeDescription, missionList, changeMission }) => {
  return (
    <div>
      <OnBlurInput
        id={index}
        label={"Task name"}
        default={task.name}
        onBlur={changeTaskName}
      />
      <select onChange={(e) => { changeMission(e.target.value, index) }}>
        {missionList && missionList.map((element, index) => {
          return (
            <option key={index} value={element.name}>{element.name}</option>
          );
        })}
      </select>
      <OnBlurArea
        id={index}
        label={"Description:"}
        default={task.description}
        numRows={3}
        onBlur={changeDescription}
      />
    </div>
  );
};


export default TaskMission;