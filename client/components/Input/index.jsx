import { Component } from 'react';

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
                {required ? (
                    <label>{label}* :</label>
                ) 
                : (
                    <label>{label}</label>
                )}
                <input 
                    type={type}
                    onChange={(e) => (onChange(e.target.value))}
                />
                <div></div>
                {showMessage && message && <span>{message}</span>}
            </div>
        );
    }
}