import { connect } from 'react-redux'
import { getSlotRequest, scheduleSlotRequest } from '../actions/calendarAction'
import Home from '../components/Home'
import { IAppState } from '../reducers/rootReducer'


// Grab the data from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    timeSlots: store.calendar.slots,
    mentor: store.calendar.mentor,
    error: store.calendar.error,
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAllSlots : ()=> dispatch(getSlotRequest()),
    scheduleCall: (time: string, date: string, status: string)=> dispatch(scheduleSlotRequest(time, date, status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home as any)
