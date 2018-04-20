import React, { Component } from 'react';

import OnBlurInput from '../../../components/OnBlurInput/index.jsx'
import OnBlurTextArea from '../../../components/OnBlurTextArea/index.jsx'

const Mission = ({ index, mission, changeMissionName, changeMissionDescription }) => {
  return (
    <div>
      <OnBlurInput
        label={"Mission"}
        index={index}
        default={mission.name}
        onBlur={changeMissionName}
      />
      <OnBlurTextArea
        label={"Descrition"}
        index={index}
        default={mission.description}
        onBlur={changeMissionDescription}
      />
    </div>
  );
};

export default Mission;