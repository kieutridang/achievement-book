import React, { Component } from 'react';
import Tick from '../Tick/index.jsx';
import { _helper } from '../api/_helper';

export default class Tickbar extends Component {
  handleSelect = (id) => {
    const { name, setFieldValue, selected, submitForm } = this.props;
    let newArr = selected.map((value) => value);
    newArr[id] = !newArr[id];
    setFieldValue(name, newArr);
    setTimeout(() => {
      submitForm();
    }, 50);
  }

  render() {
    const { label, selections, selected } = this.props;
    const listSelections = selections.map((selection, index) =>
      <Tick
        key={selection}
        label={selection}
        id={index}
        selected={selected[index]}
        onSelect={this.handleSelect}
      />
    )
    return (
      <div>
        <label>{label}</label>
        {listSelections}
      </div>
    );
  }
}