import React, { Component } from 'react'
import OnBlurInput from '../OnBlurInput/index.jsx'

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: new Array(5).fill({task: '', from: '', process: ''})
    }
  }

  render() {
    const { label } = this.props;
    const { rows } = this.state;
    return (
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
                      this.setState({rows: newRows})
                    }}
                  />
                </td>
                <td> 
                  <OnBlurInput
                    default={row.from}
                    id={i}
                    onBlur={(value, id) => {
                      var newRows = this.state.rows.map(row => row);
                      newRows[id].from = value;
                      this.setState({rows: newRows})
                    }}
                  />
                </td>
                <td> 
                  <OnBlurInput
                    default={row.process}
                    id={i}
                    onBlur={(value, id) => {
                      var newRows = this.state.rows.map(row => row);
                      newRows[id].process = value;
                      this.setState({rows: newRows})
                    }}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
        </table>
      </div>
    )
  }
}
