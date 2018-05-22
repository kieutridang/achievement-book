import React, { Component } from 'react';

import './index.scss'

export default class EditableP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue || '',
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.defaultValue != this.state.value) {
            this.setState({
                value: nextProps.defaultValue || ''
            }, () => this.handleDefaultValue())
        }
    }
    componentDidMount() {
        this.handleDefaultValue()
    }
    handleInput = (value) => {
        const maxlength = this.props.maxlength || 500;
        if (value.length <= maxlength) {
            this.setState(
                { value },
                () => this.props.handleChange(value)
            );
        }
    }
    handleDefaultValue = () => {
        const { value } = this.state;
        if (this.p) {
            this.p.innerText = value;
        }
    }
    handleKeyPress = (event) => {
        const value = this.p.innerText;
        const maxlength = this.props.maxlength || 500;
        if (value.length == maxlength) {
            event.preventDefault();
        }
    }
    handlePaste = (event) => {
        event.preventDefault();
        const value = this.p.innerText + event.clipboardData.getData("text/plain");
        const maxlength = this.props.maxlength || 500;
        if (value.length <= maxlength) {
            this.handleInput(value);
            document.execCommand("insertHTML", false, value);
        }
    }
    render() {
        const { value } = this.state;
        const { maxlength, editable } = this.props;
        return (
            <p
                className={editable === false ? 'content-disabled' : ''}
                contentEditable={editable !== undefined ? editable : true}
                ref={p => this.p = p}
                onKeyPress={(event) => this.handleKeyPress(event)}
                onPaste={(event) => this.handlePaste(event)}
                onInput={(e) => this.handleInput(e.target.innerText)}
            >
            </p>
        );
    }
}