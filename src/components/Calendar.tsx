import { useState, useEffect } from 'react'
import style from '../styles/Calendar.module.scss'

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isToday,
  parse,
  startOfToday,
} from 'date-fns'

import { compareTwoDates, getWeekNames } from '../helpers/dataParser'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
let colStartClasses = [
  '',
  style.col_start_2,
  style.col_start_3,
  style.col_start_4,
  style.col_start_5,
  style.col_start_6,
  style.col_start_7,
]

interface IReactCalendar {
  selectedDayFn(day: Date): void
}

const Calendar = ({ selectedDayFn }: IReactCalendar) => {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  const [weekDays, setWeekDays] = useState([])
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  useEffect(() => {
    const weeks = getWeekNames(today)
    setWeekDays(weeks)
  }, [])

  const handleOnSelectDate = (day: Date) => {
    setSelectedDay(day)
    selectedDayFn(day)
  }
  document.getElementById('acc-close')?.click()
  return (
    <div>
      <div className={style.calendar}>
        <div className={style.month}>
          <label className={style.nav} onClick={previousMonth}>
            <IoIosArrowDropleftCircle />
          </label>
          <div>
            <span className={style.year}>
              {' '}
              {format(firstDayCurrentMonth, 'MMMM yyyy')}
            </span>
          </div>
          <label className={style.nav} onClick={nextMonth}>
            <IoIosArrowDroprightCircle />
          </label>
        </div>
        <div className={style.days}>
          {weekDays.map((week) => {
            return <span key={week}>{week}</span>
          })}
        </div>
        <div className={style.dates}>
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
              )}
            >
              <button
                type="button"
                id={`calendarDateBtn_${dayIdx}`}
                onClick={() => handleOnSelectDate(day)}
                disabled={compareTwoDates(today, day) ? true : false}
                className={classNames(
                  !isEqual(day, selectedDay) &&
                    isToday(day) &&
                    style.nonSelectedCurrentDay &&
                    style.currentDay,
                  compareTwoDates(today, day) && style.disable_days,

                  isEqual(day, selectedDay) && isToday(day) && style.currentDay,
                  isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    style.isNotToday,
                )}
              >
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  id={format(day, 'd')}
                >
                  {format(day, 'd')}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar
