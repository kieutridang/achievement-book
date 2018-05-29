import React, { Component } from 'react';
import styled from 'styled-components';

const TotalBar = styled.div`
    margin: auto;
    width: 85%;
    height: 7px;
    border-radius: 25px;
    background-color: rgb(216, 216, 216);
`

const DoneBar = styled.div`
    width: ${props => props.percentage};
    height: 7px;
    border-radius: 25px;
    background-color: ${props => props.color || 'white'};
`

export const ProgressBar = ({percentage, color}) => (
    <TotalBar>
        <DoneBar color={color} percentage={percentage}></DoneBar>
    </TotalBar>
)

const Img = styled.img`
    display: block;
    height: 50px;
     width: 50px;
`

const InfoContainer = styled.div`
    display: flex;
    margin: auto;
    width: 80%;
    height: 80%;
    justify-content: space-between;
    align-items: center;
`

const LabelContainer = styled.div`

`

const Label = styled.label`
    display: block;
    text-align: center;
    font-family: 'Muli', sans-serif;
    font-size: 15px;
    font-weight: bold;
    color: rgb(150, 150, 150);
`

const NumberContainer = styled.span`
    font-family: 'Muli', sans-serif;
    font-size: 35px;
    font-weight: bold;
    color: ${props => props.color};
`

const BoxContainer = styled.div`
    background-color: white;
    width: 310px ;
    height: 130px;
    margin: 5px;
`

export const ProgressBox = ({image, label, done, total, color}) => (
    <BoxContainer>
        <InfoContainer>
            <LabelContainer>
                <Img src={image}/>
                <Label>{label}</Label>
            </LabelContainer>
            <NumberContainer color={color}>{done}</NumberContainer>
        </InfoContainer>
        <ProgressBar percentage={(done / total * 100) + '%'} color={color}/>
    </BoxContainer>
)