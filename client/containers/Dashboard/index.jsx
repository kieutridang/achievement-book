import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { ProgressBox } from './components/progress.jsx';

export default class Dashboard extends Component {
  render() {
    const progress = [
      { done: 3, total: 5, color: '#F79376', label: 'Day', image: '../../../public/dashboard/idea.png', },
      { done: 15, total: 20, color: '#4AC6C7', label: 'Week', image: '../../../public/dashboard/alarm-clock.png', },
      { done: 100, total: 120, color: '#AB8EE2', label: 'Month', image: '../../../public/dashboard/network.png', },
      { done: 999, total: 2000, color: '#4AC79C', label: 'All', image: '../../../public/dashboard/trophy.png', },
    ]
    return (
      <div>
        {
          progress.map(item => <ProgressBox {...item} />)
        }
      </div>
    );
  }
}