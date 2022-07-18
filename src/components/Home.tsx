import { useState, useEffect } from 'react'
import { FaClock } from 'react-icons/fa'
import { ITimeSlot } from '../models/ITimeSlots'
import TimeSlots from './TimeSlots'
import Calendar from './Calendar'
import styles from '../styles/Home.module.scss'

interface IHome {
  timeSlots: ITimeSlot
  fetchAllSlots(): void
  scheduleCall(): void
  mentor: string
}

const Home = ({ timeSlots, fetchAllSlots, mentor, scheduleCall }: IHome) => {
  const todayDateTime = new Date()
  const [date, setDate] = useState(todayDateTime)

  const handleSelectedDay = (selectedDay: any) => {
    setDate(selectedDay)
  }

  useEffect(() => {
    fetchAllSlots()
  }, [fetchAllSlots])

  return (
    <>
      <div className={styles.event}>
        {/* left container */}
        <div className={styles.event__mentor}>
          <div className={styles.event__mentor_name}>
            <label id={'mentor_name'}>{mentor}</label>
          </div>
          <div className={styles.event__mentor_title}>60 Minutes Meeting</div>
          <div className={styles.event__mentor_hours}>
            <span className={styles.event__mentor_hours_clock_icon}>
              <FaClock /> 1 Hr
            </span>
          </div>
        </div>
        {/* Calendar container */}
        <div className={styles.event__calendar}>
          <h2>Select Date and Time</h2>
          <Calendar selectedDayFn={(day) => handleSelectedDay(day)} />
        </div>
        {/* TimeSlot Container */}
        {Object.keys(timeSlots).length !== 0 ? (
          <div className={styles.event_timeslot}>
            <TimeSlots
              selectedDate={date}
              slots={timeSlots}
              mentor={mentor}
              scheduleCallFn={scheduleCall}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Home
