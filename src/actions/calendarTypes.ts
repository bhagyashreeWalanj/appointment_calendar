import { ICalendar, ITimeSlot } from "../models/ITimeSlots";
import { constants } from "./constants";

export interface ISlotState {
  slots: ICalendar;
  error: string | null;
  mentor: string | '';
}

// Fetch All Slots
export interface getSlotSuccessPayload {
    slots: ICalendar;
    mentor: string
}

export interface getSlotFailurePayload {
  error: string;
}

export interface getSlotRequest {
  type: typeof constants.GET_SLOTS_REQUEST;
}

export type getSlotSuccess = {
  type: typeof constants.GET_SLOTS_SUCCESS;
  payload: getSlotSuccessPayload;
};

export type getSlotFailure = {
  type: typeof constants.GET_SLOTS_FAILURE;
  payload: getSlotFailurePayload;
  
};

// schedule call 
export interface scheduleSlotSuccessPayload {
  slots: ICalendar;
}

export interface scheduleSlotFailurePayload {
  error: string;
}

export interface scheduleSlotRequestType {
  type: typeof constants.SCHEDULE_SLOT_REQUEST;
  time: string, 
  date: string, 
  status: string
}

export type scheduleSlotSuccess = {
type: typeof constants.SCHEDULE_SLOT_SUCCESS;
payload: scheduleSlotSuccessPayload;
};

export type scheduleSlotFailure = {
type: typeof constants.SCHEDULE_SLOT_FAILURE;
payload: scheduleSlotFailurePayload;

};


export type CalendarTypes =
  | getSlotRequest
  | getSlotSuccess
  | getSlotFailure  
  | scheduleSlotRequestType | scheduleSlotSuccess | scheduleSlotFailure