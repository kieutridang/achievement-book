import React, { Component } from "react";
import './style.scss'

export default class Tick extends Component {
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