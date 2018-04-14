import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import DateSelection from '../DateSelection/index';
import DatePicker from '../DatePicker/index.jsx';

import { _helper } from '../../components/api/_helper'
import checkAuthenticate from '../../components/functions/checkAuthenticate';

import './index.scss';


export default class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            page : '',
            
          }
          
    }
    getURL = () => {
        const newUrl = window.location.href.split("/")[window.location.href.split("/").length-1];
        if(newUrl == 'daily-result') {
            return 'result'
        }
        return 'plan';
    
    }
    handleChangePage = () => {
        //console.log(this.getURL())
        this.setState({page: this.getURL() })
    }
    componentDidMount() {
        this.setState({page: this.getURL() })
    }
    render() {
        const { show, date, handleDateChange,sideTop  } = this.props;
        const {page} = this.state;
        let cssSide = (show ? 'SideBar showing-sidebar ' : "SideBar ").concat(sideTop)
        return (
            <div 
                className={cssSide}
            >
                <div>
                    <div>
                        <img 
                            src="../../../public/chosen-page.png" 
                            alt="" 
                            className={page === 'plan' ? 'chosen-symbol' : 'unchosen-page chosen-symbol'}
                         
                        />
                        <div>
                            <img
                                src="../../../public/day-plan.png"
                                alt=""
                                className={page === 'plan' ? 'unchosen-icon' : 'chosen-icon'}
                            />
                            <img
                                src="../../../public/day-plan-chosen.png"
                                alt=""
                                className={page === 'plan' ? 'chosen-icon' : 'unchosen-icon'}
                            />
                            <Link 
                                className={page === 'plan' ? 'chosen-link page-link' : 'page-link'}
                                to='/daily-plan'
                                onClick={this.handleChangePage}
                            > 
                                Day's Plan
                            </Link>
                        </div>
                    </div>
                    <div className="line-day"></div>
                    <div>
                        <img
                            src="../../../public/chosen-page.png"
                            alt=""
                            className={page === 'result' ? 'chosen-symbol' : 'unchosen-page chosen-symbol'}
                        />
                        <div>
                            <img
                                src="../../../public/day-result.png"
                                alt=""
                                className={page === 'result' ? 'unchosen-icon' : 'chosen-icon'}
                            />
                            <img
                                src="../../../public/day-result-chosen.png"
                                alt=""
                                className={page === 'result' ? 'chosen-icon' : 'unchosen-icon'}
                            />
                            <Link
                                className={page === 'result' ? 'chosen-link page-link' : 'page-link'}
                                to='/daily-result'
                                onClick={this.handleChangePage}
                            >
                                Day's Result
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                <div className='calendar'>
                    <DatePicker
                        date={date}
                        handleDateChange={handleDateChange}
                    />
                </div>
                <div className="line"></div>
                <div>
                    <h4> Day's Topic </h4>
                    <p> Learn top 10 algorithms </p>
                </div>
            </div>
        );
    }
}