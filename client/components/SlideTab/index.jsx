import React, { Component } from 'react';
import styled from 'styled-components';

import Tab from '../Tab/index.jsx';
import EditableP from '../EditableP/index.jsx';

export default class SlideTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecting: 0,

    }
  }
  handleTabChange = (newTab) => {
    this.setState({
      selecting: newTab,
    })
  }
  render() {
    const { data } = this.props;
    const { selecting } = this.state;
    return (
      <div>
        {Object.keys(data).map((label, index) => {
        return (
          <Tab
            key={label}
            label={label}
            value={data[label]}
            tabIndex={index}
            isSelect={(index == selecting)}
            onTabChange={newTab => this.handleTabChange(newTab)}
            handleChange={(value, label) => this.props.handleChange(value, label)}
          />
        )}
      )}
    </div>
    );
  }
}