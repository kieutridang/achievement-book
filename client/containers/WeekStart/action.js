import {
  ADD_WEEKLY_MISSION,
  ADD_WEEKLY_TASK,
  CHANGE_WEEKLY_TASK_NAME,
  CHANGE_WEEKLY_TASK_DESCRIPTION,
  CHANGE_WEEKLY_TASK_MISSION,
  CHANGE_WEEKLY_MISSION_NAME,
  CHANGE_WEEKLY_MISSION_DESCRIPTION,
} from './constant'

export function addWeeklyMission() {
  return { 
    type: ADD_WEEKLY_MISSION, 
  }
}

export function changeWeeklyTaskName(value, index) {
  return {
    type: CHANGE_WEEKLY_TASK_NAME,
    value,
    index,
  }
}