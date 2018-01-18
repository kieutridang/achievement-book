import React, { Component } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validate: this.props.validate,
      message: this.props.message
    }

    _handlingChange = (name, e) => {
      
    }
  }
}