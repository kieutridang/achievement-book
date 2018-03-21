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
            <div>
                <div
                    className={selected ? 'selected-tick' : 'unselected-tick'}
                    onClick={() => { onSelect(id) }}
                >
                    <label>{label}</label>
                </div>
            </div>
        );
    }
}