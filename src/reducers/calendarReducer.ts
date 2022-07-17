import { CalendarTypes } from "../actions/calendarTypes";
import { constants } from "../actions/constants";
import { ICalendar } from "../models/ITimeSlots";
    
// Define a type for the initial state
interface IReducerState {
    slots: ICalendar;
    error: string;
    mentor: string
  }
  
const initialState: IReducerState = {
    slots: [], 
    error: '',
    mentor: ''
};

const reducer = (state = initialState, action: CalendarTypes) => {
    switch (action.type) {
        case constants.GET_SLOTS_REQUEST:
            return {
                ...state,
            };
        case constants.GET_SLOTS_SUCCESS:
            return{
                ...state,
                slots: action.payload.slots,
                mentor: action.payload.mentor,
                error: null
            }
        case constants.GET_SLOTS_FAILURE:
            return{
                ...state,
                slots: {},
                mentor: '',
                error: action.payload.error
            }
        case constants.SCHEDULE_SLOT_REQUEST:
            return{
                ...state,
                
            }
        default:
            return state;
    }
};

export default reducer;