import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        let {type, label, property, required, onChange, message, showMessage} = this.props;
        return (
            <div>
                <label>{label}: </label>
                {required && 
                    <span>*</span>
                }
                <input 
                    type={type || 'text'}
                    onChange={(e) => (onChange(e.target.value, property))}
                />
                <div></div>
                {showMessage && message && <span>{message}</span>}
            </div>
        );
    }
}
