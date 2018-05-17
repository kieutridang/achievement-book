import React, { Component } from 'react';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../../actions/weekly'
import * as select from '../../selectors/weekly';

import { _helper } from '../../components/api/_helper';

import moment from 'moment'
import TaskMission from './components/TaskMission'
import OnBlurTextArea from '../../components/OnBlurTextArea1/index.jsx'
import Mission from './components/Mission'
import NavigationBar from '../../components/NavigationBar/index.jsx'
import checkAuthenticate from '../../components/functions/checkAuthenticate'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

class WeekStart extends Component {
  checkAuth = () => {
    const { history } = this.props;
    checkAuthenticate().then((authenticate) => {
      if (!authenticate) {
        history.replace('/users/login');
      }
    })
  }
  componentDidMount = () => {
    this.checkAuth();
  }
  componentWillMount = () => {
    let firstDay = moment().startOf('week').format('dddd') === 'Sunday' ?
      moment().startOf('week').add('d', 1).format('YYYY-MM-DD') :
      moment().startOf('week').format('YYYY-MM-DD');
    this.props.getWeeklyPlan(firstDay);
  }
  render() {
    const {
      handleSubmit,
      values: {
        goal,
        days,
        missionList,
      },
      handleChange,
      submitForm,
      setFieldValue,
    } = this.props;
    const listDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const { weeklyPlan } = this.props;
    console.log(weeklyPlan);
    return (
      <div>
        <div>
          <h1>Make plan for your week</h1>
          <OnBlurTextArea
            label="Set your goal"
            name="goal"
            onBlur={submitForm}
            onChange={handleChange}
            numRows={3}
            maxlength={100}
          />
          <div>
            {
              missionList && missionList.map((mission, index) => {
                return (
                  <Mission
                    name="missionList"
                    key={index}
                    index={index}
                    mission={mission}
                    submitChange={submitForm}
                    handleChangeName={(value) => {
                      let newMissionList = JSON.parse(JSON.stringify(missionList));
                      newMissionList[index].name = value.target.value;
                      setFieldValue("missionList", newMissionList);
                    }}
                    handleChangeDescription={(value) => {
                      let newMissionList = JSON.parse(JSON.stringify(missionList));
                      newMissionList[index].description = value.target.value;
                      setFieldValue("missionList", newMissionList);
                    }}
                  />
                );
              })
            }
            <button
              onClick={() => {
                let newMissionList = JSON.parse(JSON.stringify(missionList));
                newMissionList.push({ name: '', description: '' });
                setFieldValue('missionList', newMissionList);
                setTimeout(50);
              }}
            >
              Add Mission
                </button>
          </div>
          <Tabs>
            <TabList>
              {
                listDay.map((value, index) => {
                  return (
                    <Tab key={index}>{value}</Tab>
                  );
                })
              }
            </TabList>
            {
              days.map((value, index) => {
                const { taskList } = value;
                return (
                  <TabPanel key={index}>
                    <div>
                      {
                        taskList && taskList.map((task, id) => {
                          return (
                            <TaskMission
                              key={id}
                              task={task}
                              missions={missionList}
                              submitChange={submitForm}
                              handleChangeMission={(value) => {
                                let newDay = JSON.parse(JSON.stringify(days));
                                newDay[index].taskList[id].mission = value;
                                setFieldValue("days", newDay);
                                setTimeout(50);
                                submitForm();
                              }}
                              handleChangeName={(value) => {
                                let newDay = JSON.parse(JSON.stringify(days));
                                newDay[index].taskList[id].name = value.target.value;
                                setFieldValue("days", newDay);
                              }}
                              handleChangeDescription={(value) => {
                                let newDay = JSON.parse(JSON.stringify(days));
                                newDay[index].taskList[id].description = value.target.value;
                                setFieldValue("days", newDay);
                              }}
                            />
                          );
                        })
                      }
                      <button
                        onClick={() => {
                          let newDay = JSON.parse(JSON.stringify(days));
                          newDay[index].taskList.push({ name: '', mission: '', description: '' });
                          setFieldValue("days", newDay);
                        }}
                      >Add Task</button>
                    </div>
                  </TabPanel>
                );
              })
            }
          </Tabs>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     weeklyData: state.weeklyData,
//   }
// }
const mapStateToProps = createStructuredSelector({
  weeklyPlan: select.WeeklyPlanData()
})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     editPlan: (values) => dispatch(values),
//   }
// }
const mapDispatchToProps = (dispatch) => ({
  getWeeklyPlan: (date) => dispatch(actions.fetchWeeklyPlan(date)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
//const withRedux = connect(mapStateToProps, mapDispatchToProps);

const createForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const data = props.weeklyPlan;
    let newDayList = [];
    if (!data.days || data.days < 7) {

      for (let i = 1; i <= 7; i += 1) {
        newDayList.push({ taskList: [] });
      }
    }
    else newDayList = data.days;
    const initialState = {
      goal: data.goal || '',
      days: newDayList,
      missionList: data.missions || [],
    };
    return initialState;
  },
  handleSubmit: (values, { props: { editPlan } }) => {
    console.log(values);
    //editPlan(values);
  },
});



export default compose(
  withConnect,
  createForm,
)(WeekStart);