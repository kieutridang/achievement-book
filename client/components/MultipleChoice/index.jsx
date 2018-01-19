import React, { Component } from 'react';

export default class MultipleChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsList: this.props.optionsList
    } 
  }

  handlingChange = (name, index, checked) => {
    let newOptionsList = [];
    this.state.optionsList.forEach((obj) => {
      var newObj = {};
      Object.keys(obj).forEach(key => newObj[key] = obj[key]);
      newOptionsList.push(newObj);
    });
    newOptionsList[index].checked = checked;
    this.setState({optionsList: newOptionsList}, function () {
      let checkedList = [];
      this.state.optionsList.forEach(option => {
        if (option.checked) {
          checkedList.push(option.value);
        }
      })
      this.props.onChange(name, checkedList);
    });
  }

  render() {
    const { name, label, required, optionsList, message } = this.props;
    return (
      <div>
        <label> {label} </label>
        { required && <span> * </span> }
        <form>
        {
          optionsList.map((option, index) => {
            return (
              <div key={index}>
                <label>
                  <input 
                    type = 'checkbox' 
                    name = {name} 
                    value = {index} // This is the index of the value in the optionsList
                    onClick = {
                      e => this.handlingChange(name, e.target.value, e.target.checked)
                    }/>
                  {option.value}
                </label>
              </div>
            )
          })
        }
        </form>
        <div></div>
        { message && <span> {message} </span> }
      </div>
    )
  }
}