import React, { Component } from 'react';
import TrainingDataTable from '../TrainingDataTable/index'
import PredictBox from '../PredictBox/index'

export default class PredictHousePrice extends Component {
  state = {  }
  render() {
    return (
      <div>
        <PredictBox/>
        <TrainingDataTable/>
      </div>
    );
  }
}