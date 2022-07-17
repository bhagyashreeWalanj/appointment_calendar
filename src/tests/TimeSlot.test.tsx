import React from 'react'
import { shallow } from 'enzyme'
import TimeSlots from '../components/TimeSlots'
import { formattedSlots } from '../store/mockdata'
import { withHooks } from 'jest-react-hooks-shallow'

describe('Testing Time Slot component', () => {
  const scheduleCallFn = jest.fn()
  const timeSlotList = formattedSlots
  const selectedDate = new Date(2022, 7, 23) // 2022-07-24

  withHooks(() => {
    const wrapper = shallow(
      <TimeSlots
        selectedDate={selectedDate}
        slots={timeSlotList}
        mentor={'bhagyashree'}
        scheduleCallFn={() => scheduleCallFn(12, 23, 'BOOKED')}
      />,
    )

    it('should display to Time Slot Component', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should display Selected Date in Header', () => {
      const headerDate = wrapper.find('.timeslots__header')
      expect(headerDate.html().includes('August 23')).toBe(true)
    })

    it('should display slots Of Selected Date', () => {
      const slotList = wrapper.find('.tab')
      expect(slotList.length).toBe(24)
    })

    it('should expect 1 Not Available slots from data', () => {
      const notAvailable = wrapper.find('.allotted')
      const available = wrapper.find('.tab_label')
      expect(notAvailable.length).toBe(1)
      expect(available.length).toBe(23)
    })

    it('should book a slot from data', () => {
      wrapper.find('#acc-open-12').simulate('click')
      wrapper
        .find('#message-12')
        .simulate('change', { target: { value: 'Hello' } })
      wrapper.find('#submit-12').simulate('click')
      const available = wrapper.find('.tab_label')
      expect(available.length).toBe(22)
      const notAvailable = wrapper.find('.allotted')
      expect(notAvailable.length).toBe(1)
      const booked = wrapper.find('.booked')
      expect(booked.length).toBe(1)
    })
  })
})
