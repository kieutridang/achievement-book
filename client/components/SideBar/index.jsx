import React, {Component} from 'react';
import DateSelection from '../DateSelection/index';

import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import { _helper } from '../../components/api/_helper'
import checkAuthenticate from '../../components/functions/checkAuthenticate';

import './index.scss';


export default class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = {  }
    }
    render() {
        const { date, page, handleDateChange } = this.props;
        return (
            <div 
                className='SideBar'
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
                            >
                                Day's Result
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                <div className='calendar'></div>
                <div className="line"></div>
                <div>
                    <h4> Day's Topic </h4>
                    <p> Learn top 10 algorithms </p>
                </div>
            </div>
        );
    }
}