import {
  ADD_WEEKLY_MISSION,
  ADD_WEEKLY_TASK,
  CHANGE_WEEKLY_TASK_NAME,
  CHANGE_WEEKLY_TASK_DESCRIPTION,
  CHANGE_WEEKLY_TASK_MISSION,
  CHANGE_WEEKLY_MISSION_NAME,
  CHANGE_WEEKLY_MISSION_DESCRIPTION,
} from './constant'

import {
  addWeeklyMission,
  changeWeeklyTaskName,
} from './action'

const initialState = {
  missions: [],
  tasks: [],
}

function weeklyData(state = initialState, action) {
  switch (action.type) {
    case ADD_WEEKLY_MISSION: {
      let newState = JSON.parse(JSON.stringify(state));
      newState.missions.push({name:'', description: ''});
      return newState;
    }
    case CHANGE_WEEKLY_TASK_NAME: {
      let newState = JSON.parse(JSON.stringify(state));
      newState.missions[action.index].name = action.value;
      return newState;
    }
    case CHANGE_WEEKLY_TASK_DESCRIPTION: {
      let newState = JSON.parse(JSON.stringify(state));
      newState.missions[action.index].description = action.value;
      return newState;
    }
    default: 
      return state;
  }
}

export default weeklyData;