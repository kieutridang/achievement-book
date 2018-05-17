import React, { Component } from 'react';

import OnBlurInput from '../../../components/OnBlurInput1/index.jsx'
import OnBlurTextArea from '../../../components/OnBlurTextArea1/index.jsx'

const Mission = ({ index, mission, submitChange, handleChangeName, handleChangeDescription }) => {
  return (
    <div>
      <OnBlurInput
        label={"Mission"}
        index={index}
        default={mission.name}
        onBlur={submitChange}
        onChange={handleChangeName}
      />
      <OnBlurTextArea
        label={"Descrition"}
        index={index}
        default={mission.description}
        onBlur={submitChange}
        onChange={handleChangeDescription}
      />
    </div>
  );
};

export default Mission;