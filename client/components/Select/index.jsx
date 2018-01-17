import React from 'react';

export default class Select extends React.Component {
  constructor(props) {
    super(props);
  }

  _handlingChange = (value) => {
    this.props.handlingSelectChange(value);
  }

  render() {
    const { label, optionsList } = this.props;
    return (
      <div className='select'>
        <label> {label} </label>
        <select onChange = {(e) => this._handlingChange(e.target.value)}>
          {
            optionsList.map((option, index) => {
              return (
                <option 
                  key = {index}
                  value = {option}
                > {option} </option>
              )
            })
          }
        </select>
      </div>
    )
  }
}
