import React, {Component} from 'react';
import moment from 'moment';

export default class DateSelection extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: props.date,
        }

    }
    validDate = (date) => {
        return (moment(date).isValid() && moment(date) < moment().add(1,'days'));
    }
    render() {
        const {date} = this.state;
        const {handleChange} = this.props;
        return (
            <div>
                <button
                    onClick={
                        () => {
                            var newDate = moment(date).add(-1, 'days').format('YYYY-MM-DD');
                            if (this.validDate(newDate)){
                                this.setState({
                                    date: newDate
                                }, () =>
                                    handleChange(this.state.date)
                                )
                            }
                            else {
                                alert('Not valid date');
                            }
                        }
                    }
                >-</button>
                <input 
                    type="date" 
                    value={date} 
                    onChange={
                        (e) => { 
                            var newValue = moment(e.target.value).format('YYYY-MM-DD');
                            if (this.validDate(newValue)){
                                this.setState({
                                    date: newValue
                                }, function(){
                                    handleChange(this.state.date);
                                })
                            }
                            else {
                                alert('Not a valid date');
                            }
                    }}
                />
                <button
                    onClick={
                        () => {
                            var newDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
                            if (this.validDate(newDate)) {
                                this.setState({
                                    date: newDate
                                }, () =>
                                        handleChange(this.state.date)
                                )
                            }
                            else {
                                alert('Not valid date');
                            }
                        }
                    }
                >+</button>
            </div>
        );
    }
}
