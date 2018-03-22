import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        let {type, label, required = false, onChange, message, showMessage} = this.props;
        var style = {
          borderBottomWidth: 2,
          borderBottomStyle: 'solid',
          borderBottomColor: 'red'
        }
        var inputStyle = (showMessage && message != null) ? style : undefined;
        return (
            <div>
                <label>{label}: </label>
                {required &&
                    <span>*</span>
                }
                <input
                    style = {inputStyle}

                    type={type || 'text'}
                    onChange={(e) => (onChange(e.target.value))}
                />
                <div></div>
                {showMessage && message && <span>{message}</span>}
            </div>
        );
    }
}
