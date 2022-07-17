import { combineReducers } from "redux";
import {  ISlotState } from "../actions/calendarTypes";
import calendarReducer from './calendarReducer'

export interface IAppState {
  calendar:  ISlotState
}
const rootReducer = combineReducers({
  calendar: calendarReducer
});
  
export type RootState = ReturnType<typeof rootReducer>;
  
export default rootReducer;
  