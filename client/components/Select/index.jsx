import React from 'react';

export default class Select extends React.Component {
  constructor(props) {
    super(props);
  }

  _handlingChange = (label, value) => {
    this.props.handlingSelectChange(label, value);
  }

  render() {
    const { label, optionsList } = this.props;
    return (
      <div className='select'>
        <label> {label} </label>
        <select>
          {
            optionsList.map((option, index) => {
              return (
                <option 
                  key = {index}
                  value = {option.value}
                  onClick = {() => this._handlingChange(label, option.value)}
                > {option.value} </option>
              )
            })
          }
        </select>
      </div>
    )
  }
}
