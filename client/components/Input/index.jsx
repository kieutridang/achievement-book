import React, { Component } from 'react';
import './input.scss'
export default class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		let { type, label, required = false, onChange, message, showMessage, pressEnter = {} } = this.props;
		var style = {
			borderBottomWidth: 2,
			borderBottomStyle: 'solid',
			borderBottomColor: 'red'
		}
		var inputStyle = (showMessage && message != null) ? style : undefined;
		return (
			<div className="Input">
				<label>{label}: </label>
				{required &&
					<span>*</span>
				}
				<input
					style={inputStyle}

					type={type || 'text'}
					onChange={(e) => (onChange(e.target.value))}
					onKeyPress = {(e) => {pressEnter(e)}}
				/>
				{showMessage && message && <span>{message}</span>}
			</div>
		);
	}
}
