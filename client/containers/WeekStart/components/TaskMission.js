import React, { Component } from 'react';

import OnBlurInput from '../../../components/OnBlurInput1/index.jsx';
import OnBlurArea from '../../../components/OnBlurTextArea1/index.jsx';


const TaskMission = ({ index, task, missions, submitChange, handleChangeName, handleChangeDescription, handleChangeMission }) => {
  return (
    <div>
      <OnBlurInput
        id={index}
        label={"Task name"}
        default={task.name}
        onBlur={submitChange}
        onChange={handleChangeName}
        maxlength={100}
      />
      <select onChange={handleChangeMission} value={task.name}>
        {missions && missions.map((element, index) => {
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
        onBlur={submitChange}
        onChange={handleChangeDescription}
        maxlength={100}
      />
    </div>
  );
};


export default TaskMission;