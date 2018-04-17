import React, { Component } from 'react';
import moment from 'moment';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import SideBar from '../../components/SideBar/index.jsx';
import NavigationBar from '../../components/NavigationBar/index.jsx';
import Select from '../../components/Select/index.jsx';
import EditableP from '../../components/EditableP/index.jsx';
import TickBar from '../../components/TickBar/index.jsx';
import SingleChoice2 from '../../components/SingleChoice2/index.jsx';
import SlideTab from '../../components/SlideTab/index.jsx';

import { _helper } from '../../components/api/_helper';
import checkAuthenticate from '../../components/functions/checkAuthenticate';

export default class WeekEnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.match.params.date || moment().weekday(0).format('YYYY-MM-DD'),
      user: {},
      blockingUI: false,
      completedTasksList: ['abc', 'cde'],
      mostEnthusiasticDays: [],
      efficiency: 'Low',
      experience: [{
        Problem: 'Duy',
        Cause: 'Huy',
        Solution: 'Thuc',
      }],
    }
  }

  checkAuth = () => {
    const { history } = this.props;
    checkAuthenticate().then((authenticate) => {
      if (!authenticate) {
        history.replace('/users/login');
      }
    })
  }

  getUser() {
    _helper.fetchGET(
      '/user/getuser',
      {}
    )
      .then((response) => {
        const { data, status } = response;
        if (status == 200) {
          this.setState({ user: data })
        }
      })
  }

  handleDateChange = (date) => {
    const { history } = this.props;
    history.push({ pathname: '/week-result/' + date });
  }

  componentDidMount = () => {
    this.checkAuth();
    this.getUser()
  }

  render() {
    const { date, rateOfFinishing, completedTasksList, bestTask, lessonLearned, mostEnthusiasticDays, taskRating, experience } = this.state;
    return (
      <BlockUi tag="div" blocking={this.state.blockingUI} message="Please wait" keepInView>
        <NavigationBar user={this.state.user}
          date={date}
          type={1}
          handleDateChange={this.handleDateChange}
          page='result'
        />
        <div>
          <SideBar
            date={date}
            type={1}
            handleDateChange={this.handleDateChange}
            page='result'
          />
          <div>
            <div>
              <h1>Review your week</h1>
            </div>
            <div>
              <div>
                <span>Rate of finishing task: </span>
                <span>{rateOfFinishing} %</span>
              </div>
              <Select
                label='Which completed task you feel best?'
                optionsList={completedTasksList}
                selectedValue={bestTask}
                disabled={completedTasksList && completedTasksList.length == 0}
                disabledMessage="You haven't done any task"
                onChange={(bestTask) => this.setState(
                  { bestTask },
                  () => {
                  }
                )}
              />
              <div>
                <span>What have you learned through this week?</span>
                <EditableP
                  defaultValue={lessonLearned}
                  handleChange={lessonLearned => this.setState(
                    { lessonLearned },
                    () => {

                    }
                  )}
                  maxlength={200}
                />
              </div>
              <div>
                <label className='page-label'>Best day(s) in week: </label>
                <TickBar
                  label={null}
                  selections={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sar']}
                  selected={mostEnthusiasticDays}
                  onChange={mostEnthusiasticDays => this.setState(
                    { mostEnthusiasticDays },
                    () => {

                    }
                  )}
                />
              </div>
              <SingleChoice2
                choice={taskRating}
                label='How do you feel about this week'
                optionsList={['Terrible', 'Normal', 'Good', 'Interest', 'Wonderful']}
                onChange={(taskRating) => {
                  var taskRatingNumber;
                  switch (taskRating) {
                    case 'Terrible':
                      taskRatingNumber = 0;
                      break;
                    case 'Normal':
                      taskRatingNumber = 1;
                      break;
                    case 'Good':
                      taskRatingNumber = 2;
                      break;
                    case 'Interest':
                      taskRatingNumber = 3;
                      break;

                    default:
                      taskRatingNumber = 4;
                      break;
                  }
                  this.setState(
                    { taskRating: taskRatingNumber },
                    () => {

                    }
                  )
                }}
              />
            </div>
            <span>Problem - Cause - Solution</span>
            {
              experience.map((data, index) =>
                <SlideTab
                  key={index}
                  data={data}
                  handleChange={(value, label) => {
                    let newExperience = [];
                    experience.forEach((data, index) => {newExperience[index] = data})
                    newExperience[index][label] = value;
                    this.setState({
                      experience: newExperience,
                    })
                  }}
                />)
            }
          </div>
        </div>
      </BlockUi>
    );
  }
}