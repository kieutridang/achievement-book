import React, { Component } from 'react';

export default class MultipleChoice extends Component {
  constructor(props) {
    super(props);
    this.state = { optionsList: this.props.optionsList };
    
    this._handlingChange = this._handlingChange.bind(this);
  }

  _handlingChange(index, checked) {
    let newOptionsList = this.state.optionsList;
    newOptionsList[index].checked = checked;
    this.setState({ optionsList: newOptionsList });
    let checkedList = [];
    this.state.optionsList.map((option, index) => {
      if (option.checked) {
        checkedList.push(option.value)
      }
    })
    this.props.handlingMultipleChoiceChange(checkedList);
  }

  render() {
    const { label, optionsList } = this.props;
    return (
      <div>
        <label> {label} </label>
        <form>
        {
          optionsList.map((option, index) => {
            return (
              <div key={index}>
                <label>
                  <input 
                    type='checkbox' 
                    name={this.props.property} 
                    value={index} // This is the index of the value in the optionsList
                    key={index}
                    onClick={
                      (e) => this._handlingChange(e.target.value, e.target.checked)
                    }
                  />
                  {option.value}
                </label>
              </div>
            )
          })
        }
        </form>
        <div></div>
        <label>{!this.props.validate && this.props.haveClickedSubmit && "You need to choose at least one"}</label>
      </div>
    )
  }
}