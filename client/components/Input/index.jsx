import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        let {type, label, name, required, onChange, message, showMessage} = this.props;
        return (
            <div>
                <label>{label}: </label>
                {required && 
                    <span>*</span>
                }
                <input 
                    type={type || 'text'}
                    onChange={(e) => (onChange(name, e.target.value))}
                />
                <div></div>
                {showMessage && message && <span>{message}</span>}
            </div>
        );
    }
}
