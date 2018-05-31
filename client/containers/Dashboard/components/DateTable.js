import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: white;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: 20px 0;
    @media only screen and (min-width: 650px) {
            display: none;
        }

`
const ImageTable = styled.img`
    src: url(${props => props.src});
    width: 50px;
    height: 50px;

`
const TextField = styled.label`
        font-family: 'Muli';
        font-size: 20px;
        font-weight: bold;
`
export const DateTable = ({src, data}) => (
    <Container>
        <ImageTable src={ src ? src : '../../../public/calendar.png'} />
        <TextField >{data}</TextField>
    </Container>
)




