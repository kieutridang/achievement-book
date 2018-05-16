import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../../actions/weekly'
import * as select from '../../selectors/weekly';

import { _helper } from '../../components/api/_helper';

class WeekEnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2018-05-14'
    };
  }

  componentWillMount = () => {
    this.props.getWeeklyPlan(this.state.date);
  }
  
  render() {
    const { weeklyPlan } = this.props;
    console.log(weeklyPlan);
    return (
      <div></div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  weeklyPlan : select.WeeklyPlanData()
})

const mapDispatchToProps = (dispatch) => ({
  getWeeklyPlan: (date) => dispatch(actions.fetchWeeklyPlan(date)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
)(WeekEnd);