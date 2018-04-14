import React, { Component } from "react";
import './style.scss'
export default class Tick extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        const { label , selected, id, onSelect} = this.props;
        return (
            <div className='tick-wrapper'>
                <div
                    className={selected ? 'selected-tick tick' : 'unselected-tick tick'}
                    onClick={() => { onSelect(id) }}
                >
                </div>
                <label className='tick-label'>{label}</label>
            </div>
        );
    }
}