import * as React from 'react'
import CalendarContainer from '../containers/CalendarContainer'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './Footer'
import style from '../styles/Home.module.scss'

const App: React.FunctionComponent<{}> = () => {
  return (
    <React.Fragment>
      <h2 className={style.header}>Mentor Calendar</h2>
      <CalendarContainer />
      <Footer />
    </React.Fragment>
  )
}

export default App
