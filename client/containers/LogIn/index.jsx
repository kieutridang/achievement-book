import React, { Component } from 'react'
import Input from '../../components/Input/index.jsx'
import Button from '../../components/Button/index.jsx'

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      password: ''
     }
  }

  render() {
    return (
      <div>
        <h1> Log In </h1>
        <Input
          label = "Username"
          property = 
        />
      </div>
    )
  }
}
