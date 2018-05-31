import React, { Component } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

const ChartWrapper = styled.div`
    width: 100%;
    background: white;
    margin: 0 20px;
    .chartjs-render-monitor {
      min-height: 350px;
      max-height: 300px;
    }
    @media only screen and (max-width: 650px) {
        margin-bottom: 20px ;
    }
`

const Title = styled.h1`
  margin: 0;
  font-family: 'Muli', sans-serif;
  font-size: 35px;
  font-weight: bold;
  color: #5F29AE;
  padding-left: 20px;
`

export const Chart = ({ data }) => {
  return (
    <ChartWrapper>
      <Title>Statistics</Title>
      <Line data={data} />
    </ChartWrapper>
  )
}
