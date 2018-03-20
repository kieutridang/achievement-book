import React, { Component } from 'react'

export default class OnBlurInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default || '',

      edit: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.default != nextProps.default) {
      this.setState({
        value: nextProps.default || ''
      })
    }
  }

  handlingBlur = (value) => {
    const { type, conditions } = this.props
    if (type == 'number' && conditions) {
      if (value > conditions.max) { value = conditions.max.toString() }
      if (value < conditions.min) { value = conditions.min.toString() }
    }
    this.props.onBlur(value, this.props.id);
    this.setState({
      edit: false,
      value: value
    })
  }

handlingkeydown = (e) => {
  if(e.keyCode === 69 && this.props.type =='number') {
    e.preventDefault();
  }
}

  handlingDoubleClick = () => {
    this.setState({ edit: true })
  }

  render() {
    let { id, type, label, required, suggestion, onBlur, message, showMessage, disabled } = this.props;
    let { value, edit } = this.state;
    return (
      <div>
        {label && <label> {label}: </label>}
        {required && <span>*</span>}
        {suggestion &&
          <div>
            <div></div>
            <p> {suggestion} </p>
          </div>
        }
        {
          (edit || value == '') ?
            (
              (!disabled) ?
                <input
                  type={type || 'text'}
                  defaultValue={value}
                  onKeyDown={(e) => {
                       this.handlingkeydown(e)
                     }
                   }
                  onBlur={(e) => {
                      this.handlingBlur(e.target.value)
                    }
                  }

                />
                : <input
                  type={type || 'text'}
                  defaultValue={value}
                  onBlur={(e) => {
                    this.handlingBlur(e.target.value)

                  }
                  }

                  disabled
                />
            )
            : <span onDoubleClick={this.handlingDoubleClick}> {value} </span>
        }
        <div></div>
        {showMessage && message && <span>{message}</span>}
      </div>
    )
  }
}
