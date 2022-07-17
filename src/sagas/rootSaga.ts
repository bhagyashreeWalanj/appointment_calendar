import { all, fork } from "redux-saga/effects";
import calendarSaga from "./calendarSaga";

export function* rootSaga() {
  yield all([fork(calendarSaga)]);
}
