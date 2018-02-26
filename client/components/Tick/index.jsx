import React, { Component } from "react";
import './style.scss'
export default class Tick extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        const { label , selected, index, onSelect} = this.props;
        return (
            <div 
                className = {selected ? 'selected-tick' : 'unselected-tick'}
                onClick = {() => {onSelect(index)}}
            >
                <label>{ label }</label>
            </div>
        );
    }
}