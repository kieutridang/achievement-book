import React, { Component } from 'react';
import SlideTab from '../SlideTab/index.jsx';

export default class SlideTabContainer extends Component {
  state = {}
  handleChange = (newData, label, index) => {
    const { name, setFieldValue, submitForm, value } = this.props;
    let newValue = [];
    value.forEach((data, index) => { newValue[index] = data })
    newValue[index][label] = newData;
    setFieldValue(name, newValue);
    setTimeout(() => {
      submitForm();
    }, 50);
  }
  addExperience = () => {
    const { name, setFieldValue, submitForm, value } = this.props;
    let newValue = [];
    value.forEach((data, index) => { newValue[index] = data })
    newValue.push({
      Problem: '',
      Cause: '',
      Solution: '',
    });
    setFieldValue(name, newValue);
    setTimeout(() => {
      submitForm();
    }, 50);
  }
  render() {
    const { label, value } = this.props;
    return (
      <div>
        <span>{label}</span>
        {
          value.map((data, index) =>
            <SlideTab
              key={index}
              data={data}
              handleChange={(value, label) => this.handleChange(value, label, index)}
            />)
        }
        <div
          onClick={this.addExperience}
        >Add new experience</div>
      </div>
    );
  }
}