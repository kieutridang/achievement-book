import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { ProgressBox } from './components/progress.jsx';
import { Chart } from './components/chart.jsx';

export default class Dashboard extends Component {
  render() {
    const progress = [
      { done: 3, total: 5, color: '#F79376', label: 'Day', image: '../../../public/dashboard/idea.png', },
      { done: 15, total: 20, color: '#4AC6C7', label: 'Week', image: '../../../public/dashboard/alarm-clock.png', },
      { done: 100, total: 120, color: '#AB8EE2', label: 'Month', image: '../../../public/dashboard/network.png', },
      { done: 999, total: 2000, color: '#4AC79C', label: 'All', image: '../../../public/dashboard/trophy.png', },
    ];
    const dailyData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: 'Task done',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [3, 1, 0, 5, 2, 4, 2]
        }
      ]
    };
    return (
      <div>
        {
          progress.map(item => <ProgressBox {...item} />)
        }
        <Chart data={dailyData} />
      </div>
    );
  }
}