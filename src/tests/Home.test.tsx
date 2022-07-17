import React from 'react'
import { shallow } from 'enzyme'
import Home from '../components/Home'

describe('Testing Home Component', () => {
  const fetchAllSlots = jest.fn()
  const scheduleCall = jest.fn()
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

  const wrapper = shallow(
    <Home
      timeSlots={timeSlots}
      fetchAllSlots={fetchAllSlots}
      mentor="Bhagyashree WALANJ"
      scheduleCall={scheduleCall}
    />,
  )

  const mentorContainer = wrapper.find('#mentor_name')

  it('should display to Home Component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should display mentor name ', () => {
    expect(mentorContainer.text().includes('Bhagyashree')).toBe(true)
  })
})
