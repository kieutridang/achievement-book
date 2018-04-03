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
        const { date, handleDateChange } = this.props;
        return (
            <div className="SideBar">
                <div>
                    <div>
                        <img src="../../../public/chosen-page.png" alt=""/>
                        <div>
                            <img src="../../../public/day-plan.png" alt="" />
                            <Link to='/daily-plan'>Day's Plan</Link>
                        </div>
                    </div>
                    <div>
                        <img src="../../../public/chosen-page.png" alt=""/>
                        <div>
                            <img src="../../../public/day-result.png" alt="" />
                            <Link to='/daily-result'>Day's Result</Link>
                        </div>
                    </div>
                </div>
                <DateSelection
                    date={date}
                    handleChange={date => handleDateChange(date)}
                />
                <div>
                    <h3> Day's Topic </h3>
                    <p> Learn top 10 algorithms </p>
                </div>
            </div>
        );
    }
}