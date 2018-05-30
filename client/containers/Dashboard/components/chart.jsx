import React, { Component } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

const ChartWrapper = styled.div`
  width: 50%;
  height: 40%;
  background-color: white;
`

const Title = styled.h1`
  font-family: 'Muli', sans-serif;
  font-size: 35px;
  font-weight: bold;
  color: #5F29AE;
`

export const Chart = ({ data }) => {
  return (
    <ChartWrapper>
      <Title>Statistics</Title>
      <Line data={data} />
    </ChartWrapper>
  )
}
