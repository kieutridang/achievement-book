import React, { Component } from 'react';
import moment from 'moment';
import { withFormik } from 'formik';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../../actions/weekly'
import * as select from '../../selectors/weekly';

import SideBar from '../../components/SideBar/index.jsx';
import NavigationBar from '../../components/NavigationBar/index.jsx';
import Select from '../../components/Select2/index.jsx';
import EditableP from '../../components/EditableP/index.jsx';
import TickBar from '../../components/TickBar/index.jsx';
import SingleChoice2 from '../../components/SingleChoice2/index.jsx';
import SlideTab from '../../components/SlideTab/index.jsx';
import EditableP2 from '../../components/EditableP2/index.jsx';
import TickBar2 from '../../components/TickBar2/index.jsx';
import SingleChoice3 from '../../components/SingleChoice3/index.jsx';
import SlideTabContainer from '../../components/SlideTabContainer/index.jsx';

import { _helper } from '../../components/api/_helper';
import checkAuthenticate from '../../components/functions/checkAuthenticate';


const formikEnhancer = withFormik({
  // mapPropsToValues: props => ({
  //   date: props.date,
  //   rateOfFinishing: 0,
  //   bestCompletedTask: '',
  //   completedTasksList: ['abc', 'cde'],
  //   lessonLearned: '',
  //   mostEnthusiasticDays: [false, false, false, false, false, false, false],
  //   taskRating: null,
  //   interestingStories: '',
  //   experience: [{
  //     Problem: 'Duy',
  //     Cause: 'Huy',
  //     Solution: 'Thuc',
  //   }],
  // }),
  mapPropsToValues: props => {
    const { rateOfFinishing,
      bestCompletedTask,
      completedTasksList,
      lessonLearned,
      mostEnthusiasticDays,
      taskRating,
      interestingStories,
      experience,
    } = {
        rateOfFinishing: 0,
        bestCompletedTask: '',
        completedTasksList: [],
        lessonLearned: '',
        mostEnthusiasticDays: [false, false, false, false, false, false, false],
        taskRating: null,
        interestingStories: '',
        experience: [],
        ...props.weeklyPlan,
      };
    return {
      rateOfFinishing: rateOfFinishing || 0,
      bestCompletedTask: bestCompletedTask || '',
      completedTasksList: completedTasksList || [],
      lessonLearned: lessonLearned || '',
      mostEnthusiasticDays: mostEnthusiasticDays || [false, false, false, false, false, false, false],
      taskRating: taskRating || null,
      interestingStories: interestingStories || '',
      experience: experience || [],
    }
  },
  handleSubmit: (values, { setSubmitting }) => {
    setSubmitting(false);
  },
})

const WeekEndForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    submitForm,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    setSubmitting,
  } = props;
  return (
    <div>
      <div>
        <div>
          <h1>Review your week</h1>
        </div>
        {/* <div>
          <span>Rate of finishing task: </span>
          <span>{values.rateOfFinishing} %</span>
        </div> */}
        <Select
          label='Which completed task you feel best?'
          name='bestCompletedTask'
          optionsList={values.completedTasksList}
          value={values.bestTask}
          disabled={!values.completedTasksList || values.completedTasksList.length == 0 || isSubmitting}
          disabledMessage="You haven't done any task"
          setFieldValue={setFieldValue}
          submitForm={submitForm}
          setSubmitting={setSubmitting}
          error={errors.bestCompletedTask}
          touched={touched.bestCompletedTask}
        />
        <EditableP2
          label='What have you learned through this week?'
          name='lessonLearned'
          value={values.lessonLearned}
          maxlength={200}
          disabled={isSubmitting}
          setFieldValue={setFieldValue}
          submitForm={submitForm}
          error={errors.lessonLearned}
          touched={touched.lessonLearned}
        />
        <TickBar2
          label='Best day(s) in week:'
          name='mostEnthusiasticDays'
          selections={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sar']}
          selected={values.mostEnthusiasticDays}
          setFieldValue={setFieldValue}
          submitForm={submitForm}
        />
      </div>
      <SingleChoice3
        label='How do you feel about this week'
        choice={values.taskRating}
        name='taskRating'
        optionsList={['Terrible', 'Normal', 'Good', 'Interest', 'Wonderful']}
        setFieldValue={setFieldValue}
        submitForm={submitForm}
      />
      <EditableP2
        label='Interesting stories in week:'
        name='interestingStories'
        value={values.interestingStories}
        maxlength={200}
        disabled={isSubmitting}
        setFieldValue={setFieldValue}
        submitForm={submitForm}
        error={errors.interestingStories}
        touched={touched.interestingStories}
      />
      <SlideTabContainer
        label='Problems - Causes - Solutions'
        name='experience'
        value={values.experience}
        setFieldValue={setFieldValue}
        submitForm={submitForm}
      />
    </div>
  )
}

const WeekEndFormik = formikEnhancer(WeekEndForm);

class WeekEnd extends Component {
  checkAuth = () => {
    const { history } = this.props;
    checkAuthenticate().then((authenticate) => {
      if (!authenticate) {
        history.replace('/users/login');
      }
    })
  }

  handleDateChange = (date) => {
    const { history } = this.props;
    history.push({ pathname: '/week-result/' + date });
  }

  componentWillMount = () => {
    const date = this.props.match.params || moment().weekday(0).format('YYYY-MM-DD');
    this.checkAuth();
    this.props.getWeeklyPlan(date);
  }

  componentDidMount = () => {
  }

  render() {
    const { weeklyPlan } = this.props;
    const date = this.props.match.params.date || moment().weekday(0).format('YYYY-MM-DD');
    return (
      <BlockUi tag="div" blocking={false} message="Please wait" keepInView>
        {/* <NavigationBar user={this.state.user}
          date={date}
          type={1}
          handleDateChange={this.handleDateChange}
          page='result'
        /> */}
        <div>
          <SideBar
            date={date}
            type={1}
            handleDateChange={this.handleDateChange}
            page='result'
          />
          {
            <WeekEndFormik
              weaklyPlan={weeklyPlan}
            />
          }
        </div>
      </BlockUi>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  weeklyPlan: select.WeeklyPlanData()
})

const mapDispatchToProps = (dispatch) => ({
  getWeeklyPlan: (date) => dispatch(actions.fetchWeeklyPlan(date)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
)(WeekEnd);