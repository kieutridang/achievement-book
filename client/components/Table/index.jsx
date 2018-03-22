import React, { Component } from 'react'
import OnBlurInput from '../OnBlurInput/index.jsx'
import moment from 'moment'

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
    const { label, reqUrl, date } = this.props;
    const { rows } = this.state;
    let moveTask = false;
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
                <th> Process(%) </th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map((row, i) => (
                  moveTask = row.process != null && row.process.toString() === '100' ? true : false,
                  <tr key={i}>
                    <td>
                      <OnBlurInput
                        default={row.task}
                        maxLength="70"
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
                        type = 'number'
                        default={row.process}
                        id={i}
                        conditions={{min: 0, max: 100}}
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
                    <td>
                        {
                        (date < moment().add(1, 'd').format('YYYY-MM-DD')) &&
                        <button
                          onClick = {() => {
                              var getURL;
                              let tommorrowDay = moment().add(1, 'd').format('YYYY-MM-DD');
                              _helper.fetchGET('/dailyplan/getplan/' + tommorrowDay, {})
                              .then((response) => {
                                let tommorowTask = response.data.plan;
                                for (var i = 0; i < 5; ++i) {
                                  if (tommorowTask[i] && row.task == tommorowTask[i].task && row.from == tommorowTask[i].from) {
                                    tommorowTask[i].process = row.process;
                                    return tommorowTask;

                                  }
                                }
                                for (var i = 0; i < 5; ++i) {
                                  if (!tommorowTask[i] || tommorowTask[i].task == '' && tommorowTask[i].from == '') {
                                    tommorowTask[i] = row;
                                    return tommorowTask;
                                  }
                                }
                              })
                              .then((tommorowTask) => {
                                _helper.fetchAPI('/dailyplan/updateplan/' + tommorrowDay, {plan: tommorowTask}, [], "PUT")
                              })
                            }
                          }
                        >
                          Move Task
                        </button>
                        }
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
