import React, { Component } from 'react';
import styled from 'styled-components';

import EditableP from '../EditableP/index.jsx';

export default class Tab extends Component {
  state = {}
  render() {
    const { label, value, isSelect, tabIndex } = this.props;
    return (
      <div>
        <div
          onClick={() => this.props.onTabChange(tabIndex)}
        >
          <span>{label}</span>
        </div>
        {
          isSelect &&
          (
            <div>
              <EditableP
                defaultValue={value}
                handleChange={value => this.props.handleChange(value, label)}
                maxlength={200}
              />
            </div>
          )
        }
      </div>
    );
  }
}