import { all, call, put,  takeLatest } from "redux-saga/effects";
import { constants } from "../actions/constants";
import { fetchSlots  } from '../store/service'
import { AnyAction } from "redux";
import * as ACTIONS from "../actions/calendarAction";
import { initData } from "../helpers/dataParser";

function* fetchAllSlots():any {

  try {
    const response = yield call(fetchSlots);
    const slots = response.data;
    const jsonObj = initData(slots);  
    yield put(ACTIONS.getSlotSuccess({
        slots: jsonObj,
        mentor: slots.mentor.name
      })
    );
  } catch (e) {
    let errorMessage = "Failed to do something exceptional";
    if(e instanceof Error){
        yield put(
          ACTIONS.getSlotFailure({
              error: errorMessage
            })
          );
    }
    
  }
}
function* scheduleSlot(action: AnyAction):any {

  try {
    const date = action.date
    const time = action.time
  
    const existingDate = localStorage.getItem(date)

      localStorage.setItem(
        date,
        existingDate ? existingDate + ',' + time : time,
      )

    yield put(ACTIONS.scheduleSlotSuccess({
      slots: {}
    }))
  } catch (error) {
    console.log("error")
  }
}


function* calendarSaga() {
    yield all([
      takeLatest(constants.GET_SLOTS_REQUEST, fetchAllSlots),
      takeLatest(constants.SCHEDULE_SLOT_REQUEST, scheduleSlot)
    ]);
  }

export default calendarSaga;