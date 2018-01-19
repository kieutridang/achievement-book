import React, {Component} from 'react'

export default class Label extends React.Component{
    constructor(props) {
        super(props);
    }
    render () {
        const {label, labelRequired} = this.props;
        return (
            <div>
                {labelRequired ? (
                    <label> {label}* : </label>
                ) 
                : (
                    <label > {label} :</label>
                )}
            </div>
        ) 
    }
}