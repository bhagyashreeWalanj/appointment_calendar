import React from 'react'
import { shallow } from 'enzyme'
import Calendar from '../components/Calendar'
import { getDate } from 'date-fns'
import { compareTwoDates } from '../helpers/dataParser'
import {
  add,
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from 'date-fns'
describe('Testing Calendar Component', () => {
  const selectedDayFn = jest.fn()
  const timeSlots = {
    mentor: {
      name: 'Max Mustermann',
      time_zone: '-03:00',
    },
    calendar: [
      {
        date_time: '2022-07-24 00:37:02 +0200',
      },
      {
        date_time: '2022-07-24 03:31:50 +0200',
      },
      {
        date_time: '2022-07-24 12:13:56 +0200',
      },
      {
        date_time: '2022-07-25 20:49:10 +0200',
      },
    ],
  }

  const wrapper = shallow(<Calendar selectedDayFn={selectedDayFn} />)
  let todayDate = getDate(new Date())

  it('should display to Home Component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should display current Day', () => {
    const container = wrapper.find('.currentDay')
    expect(container.contains(todayDate.toString())).toBe(true)
  })

  it('should disable past dates', () => {
    const isPastDate = compareTwoDates(
      new Date(),
      new Date('2022-07-02T22:00:00.000Z'),
    )
    const disableDayContainer = wrapper.find(`.disable_days time`).at(9)

    expect(disableDayContainer.html().includes('10')).toBe(true)
    expect(isPastDate).toBe(true)
  })

  it('should not allow to select disable date and call function', () => {
    const disableDayContainer = wrapper.find(`.disable_days time`).at(9)
    expect(disableDayContainer.html().includes('10')).toBe(true)
    expect(selectedDayFn).toBeCalledTimes(0)
  })
  it('should display get selected Date Slot List', () => {
    wrapper.find('#calendarDateBtn_17').simulate('click')
    expect(selectedDayFn).toBeCalledTimes(1)
  })
})
