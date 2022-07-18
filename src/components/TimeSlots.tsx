import React, { useState, useEffect } from 'react'
import { getAllSlotsWithStatus } from '../helpers/dataParser'
import styles from '../styles/TimeSlots.module.scss'
import { format } from 'date-fns'
import Notification from './Notification'
import { status } from '../actions/constants'
import { ToastContainer } from 'react-toastify'

interface ITimeSlots {
  selectedDate: Date
  slots: any
  mentor: string
  scheduleCallFn(time: string, date: string, status: string): void
}

const TimeSlots = ({
  selectedDate,
  slots,
  mentor,
  scheduleCallFn,
}: ITimeSlots) => {
  const [timeSlots, setTimeSlots] = useState([])
  const [submittedDate, setsubmittedDate] = useState(selectedDate)
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (Object.keys(slots).length !== 0) {
      const year = selectedDate.getFullYear()
      const month = selectedDate.getMonth()
      const date = selectedDate.getDate()

      const slotsInHrsArray = slots[year]
        ? slots[year][month]
          ? slots[year][month][date]
            ? slots[year][month][date]
            : []
          : []
        : []
      const timingArray = getAllSlotsWithStatus(slotsInHrsArray, selectedDate)
      setTimeSlots(timingArray)
    }
  }, [slots, selectedDate, submittedDate])

  const handleOnChange = (e: any) => {
    setReason(e.target.value)
  }

  const handleSubmit = (selectedSlot: any, id: string) => {
    if (reason) {
      scheduleCallFn(
        selectedSlot.hour,
        selectedDate.getDate().toString(),
        'BOOKED',
      )
      Notification(
        'success',
        `You are scheduled a call with ${mentor} on Day ${format(
          selectedDate,
          'PPPP',
        )} 
      at ${selectedSlot.timeSlot} with following message: ${reason}`,
        setReason(''),
      )
      saveBookedSlot(selectedSlot)
      setsubmittedDate(selectedSlot.hour)
      document.getElementById(id)?.click()
    } else {
      Notification('warning', `You haven't added any reason`)
    }
  }
  const saveBookedSlot = (selectedSlot: any) => {
    const date = selectedDate.getDate().toString()
    const existingDate = localStorage.getItem(date)
    const time = selectedSlot.timeSlot.split(':')[0]
    localStorage.setItem(date, existingDate ? existingDate + ',' + time : time)
  }

  const handleOnSlotClick = (currentSlotStatus: string) => {
    if (currentSlotStatus !== status.AVAILABLE) {
      Notification(
        'error',
        `Slot is already booked. Please check available slots`,
      )
    }
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.timeslots}>
        <div className={styles.timeslots__header}>
          <h4>{format(selectedDate, 'PPPP')}</h4>
        </div>
        <div className={styles.timeslots__body}>
          <input
            type="radio"
            name="openCloseAccordion"
            id="acc-close"
            className={styles.hide_button}
          />
          <div className={styles.tabs}>
            {timeSlots.map((slot: any, index: number) => {
              return (
                <div
                  className={styles.tab}
                  key={slot.timeSlot}
                  onClick={() => handleOnSlotClick(slot.status)}
                >
                  <input
                    id={`checkbox-${index}`}
                    type="radio"
                    name="openCloseAccordion"
                    style={{ display: 'none' }}
                  />

                  <label
                    className={
                      slot.status === status.AVAILABLE
                        ? styles.tab_label
                        : slot.status === status.NOT_AVAILABLE
                        ? styles.allotted
                        : styles.booked
                    }
                    id={`acc-open-${index}`}
                    htmlFor={
                      slot.status !== status.AVAILABLE
                        ? ''
                        : `checkbox-${index}`
                    }
                  >
                    <span>{slot.timeSlot}</span>
                    {slot.status}
                  </label>
                  <div className={styles.tab_content}>
                    <h4>Reason for a Call :</h4>
                    <input
                      type="text"
                      name={`message_${index}`}
                      className={styles.textBox}
                      id={`message-${index}`}
                      value={reason}
                      onChange={(e) => handleOnChange(e)}
                    />
                    <button
                      id={`submit-${index}`}
                      type="submit"
                      className={styles.confirmButton}
                      onClick={() => handleSubmit(slot, `close_${index}`)}
                    >
                      Confirm Call
                    </button>
                  </div>
                  <label
                    className={styles.box_close}
                    id={`close_${index}`}
                    htmlFor="acc-close"
                  ></label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default TimeSlots
