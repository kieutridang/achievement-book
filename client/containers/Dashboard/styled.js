import styled from 'styled-components';
import React from 'react';
import DatePicker from '../../components/DatePicker/index.jsx'
import moment from 'moment';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ProgressBox } from './components/progress.jsx';



export const TextDashboard = styled.div`
    display: flex;
    margin-top: 50px;
    background: white;
    height: 50px;
    min-width: 400px;
    align-items: center;
    font-weight: bold;
    padding-left: 50px;
    font-size: 20px;
    font-family: 'Muli', sans-serif;
    @media only screen and (max-width: 900px) {
        margin-top: 40px;
    }
    @media only screen and (max-width: 650px) {
        margin-top: 40px;
        justify-content: center;
        padding-left: 0;
    }

`
export const Main = styled.div`
    max-width: 1300px;
    min-width: 400px;
    margin: auto;
    padding: 0 20px;
    margin-bottom: 50px;
    }
`
export const ProgressWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0px;
    @media only screen and (max-width: 650px) {
        display: none;
    }
   
`
export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: auto;
    @media only screen and (max-width: 650px) {
        margin: auto;
        flex-direction: column-reverse;
        align-items: center;
    }
    @media only screen and (max-width: 1250px) {
        margin: 0 10px;
    }
   
`
const DatePickerWrapper = ({ className, date }) => (
    <div className={className}>
        <DatePicker date={date} type={0} page='plan' />
    </div>
)
export const DPWrapper = styled(DatePickerWrapper) `
    
   
    .sc-dnqmqq {
        height: 400px;
        @media only screen and (max-width: 650px) {
            display: none;
        }
    }
    
`
const CarouselWP = ({ className, data, handlerClick }) => (
    <div className={className}  >
        <Carousel showThumbs={false} showStatus={false} showArrows={false} showIndicators={true} autoPlay={true} infiniteLoop={true} >
            {
                data.map((item, i) => ( <ProgressBox key={i} {...item} handlerClick={() => handlerClick(i)}/>))
            }
        </Carousel>
    </div>
)
export const CarouselWrapper = styled(CarouselWP) `
    .slider-wrapper {
        margin-bottom: 20px ;
  
     
        @media only screen and (min-width: 650px) {
            display: none;
        }
    }
    .slide {
        background: white;
        img {
            width: 50px;
        }
    }
    .dot.selected {
        background: orange;
    }
    .carousel .control-dots {
       margin-bottom: 20px;
    }
`
