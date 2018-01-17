import React from 'react';

export default class SingleChoice extends React.Component {
  constructor(props) {
    super(props);
  }

  _handlingChange = (value) => {
    this.props.handlingSingleChoiceChange(value);
  }

  render() {
    const { label, optionsList } = this.props;
    return (
      <div>
        <label> {label} </label>
        <form>
        {
          optionsList.map((option, index) => {
            <div>
              <label>
                <input type='radio' name={this.props.property} value={option} key={index} onClick={(e) => this._handlingChange(e.target.value)}/>
                {option} 
              </label>
            </div>
          })
        }
        </form>
      </div>
    )
  }
}