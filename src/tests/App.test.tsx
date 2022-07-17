import React from 'react'
import App from '../components/App'
import { shallow } from 'enzyme'
import CalendarContainer from '../containers/CalendarContainer'
import Footer from '../components/Footer'

describe('render all components', () => {
  const app = shallow(<App />)

  it('should match the snapshot', () => {
    expect(app).toMatchSnapshot()
  })
  it('App Component contains Home component', () => {
    expect(app.contains(<CalendarContainer />)).toBe(true)
  })
  it('App Component contains Footer component', () => {
    expect(app.contains(<Footer />)).toBe(true)
  })
})
