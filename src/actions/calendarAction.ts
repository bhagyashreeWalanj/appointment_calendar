import { constants } from "./constants";
import * as TYPES from "./calendarTypes";


export const getSlotRequest = (): TYPES.getSlotRequest => ({
    type: constants.GET_SLOTS_REQUEST
  });
  
  export const getSlotSuccess = (
    payload: TYPES.getSlotSuccessPayload
  ): TYPES.getSlotSuccess => ({
    type: constants.GET_SLOTS_SUCCESS,
    payload
  });
  
  export const getSlotFailure = (
      payload: TYPES.getSlotFailurePayload
  ): TYPES.getSlotFailure => ({
    type: constants.GET_SLOTS_FAILURE,
    payload
  });

  // schedule slot 
  export const scheduleSlotRequest = (time: string, date: string, status: string)
  : TYPES.scheduleSlotRequestType => {
  return{
    type: constants.SCHEDULE_SLOT_REQUEST,
    time, date, status
  } 
};
  
  export const scheduleSlotSuccess = (
    payload: TYPES.scheduleSlotSuccessPayload
  ): TYPES.scheduleSlotSuccess => ({
    type: constants.SCHEDULE_SLOT_SUCCESS,
    payload
  });
  
  export const scheduleSlotFailure = (
      payload: TYPES.scheduleSlotFailurePayload
  ): TYPES.scheduleSlotFailure => ({
    type: constants.SCHEDULE_SLOT_FAILURE,
    payload
  });