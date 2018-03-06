import React, { Component } from 'react'
import OnBlurInput from '../OnBlurInput/index.jsx'

import { _helper } from '../api/_helper'

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: props.rows
    }
  }

  componentDidMount = () => {
    var newRows = this.state.rows.map(value => value);
    var length = 5 - newRows.length;
    for (var i = 0; i < length; ++i) {
      newRows.push({task: '', from: '', process: ''})
    }
    this.setState({rows: newRows})
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);
    var newRows = nextProps.rows;
    var length = 5 - newRows.length;
    for (var i = 0; i < length; ++i) {
      newRows.push({ task: '', from: '', process: '' })
    }
    this.setState({ rows: newRows })
  }

  render() {
    const { label, reqUrl } = this.props;
    const { rows } = this.state;
    return (
      <div>
        <div>
          { label && <label> {label} </label> }
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th> Task </th>
                <th> From </th>
                <th> Process </th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map((row, i) => (
                  <tr key={i}>
                    <td> 
                      <OnBlurInput
                        default={row.task}
                        id={i}
                        onBlur={(value, id) => {
                          var newRows = this.state.rows.map(row => row);
                          newRows[id].task = value;
                          this.setState(
                            {rows: newRows},
                            () => {
                              _helper.fetchAPI(reqUrl, {plan: newRows}, [], "PUT")
                            }
                          )
                        }}
                      />
                    </td>
                    <td> 
                      <OnBlurInput
                        type = 'time'
                        default={row.from}
                        id={i}
                        onBlur={(value, id) => {
                          var newRows = this.state.rows.map(row => row);
                          newRows[id].from = value;
                          this.setState(
                            {rows: newRows},
                            () => {
                              _helper.fetchAPI(reqUrl, {plan: newRows}, [], "PUT")
                            }
                          )
                        }}
                      />
                    </td>
                    <td> 
                      <OnBlurInput
                        min={0}
                        max={100}
                        type = 'number'
                        default={row.process}
                        id={i}
                        onBlur={(value, id) => {
                          var newRows = this.state.rows.map(row => row);
                          newRows[id].process = value;
                          this.setState(
                            {rows: newRows},
                            () => {
                              _helper.fetchAPI(reqUrl, {plan: newRows}, [], "PUT")
                            }
                          )
                        }}
                      />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
