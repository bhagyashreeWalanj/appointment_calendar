# Mentor Appointment Booking - Code Challenge

> This is an implemenation of the Mentor Appointment Booking app for CareerFoundry frontend code challenge.

# About the challenge

In this code challenge, you’ll be creating the frontend of the booking calendar mentioned above, enabling students to
schedule a call with their mentors. You can find the user stories for this feature below the description of the challenge.
Since you don't have access to the backend engineers, you might need to document for them the requirements for
the API endpoints.

User stories
As a student he want to book a call with a mentor
So that You can have a mentoring session during a course

Provided Endpoint :
`API documentation: https://cfcalendar.docs.apiary.io/`

## Project information

- Developed using React,Typescript,functional components and Redux-saga concept
- Tested using Jest and Enzyme.
- React Version `^18.2.0`
- Node version `v14.17.3` (LTS)
- Running Application available on [Netlify](https://schedule-mentor.netlify.app/)

## Project structure

- `src` Base app files.

- `src/components` Reusable components,

  - `App.tsx` - Parent Component
  - `Home.tsx` - main component includes calendar and timeslot cmponent
  - `Calendar.tsx` - For calendar component
  - `TimeSlots.tsx` - for showing TimeSlots on select of Date from Calendar
  - `Notification.tsx` - showing Notification using React-tostify

- `src/actions` includes all actions, types and constants files
- `src/model` includes interfaces
- `src/containers` includes containers for components
- `src/helpers` includes data parsing methods
- `src/reducers` includes all reducers and root reducer
- `src/sagas` includes rootsaga and other saga files
- `src/store` includes store file, server file and etc
- `src/styles` includes sass files for all components
- `src/tests` Folder for tests files,

## Technical Documentation

- Design Specifications Of Project

### 1. Scenarios :

I have created 3 components on prior, as Home, Calendar and TimeSlots component.
In Home I have given mentor name and loads calendar component and Timeslots component as per the current Date and time.

#### Scenario 1: IMPLEMENTED

User Open the Calendar Page
When User click on a date
Then he can see all the time slots containing the available and already allocated call sessions

#### Scenario 2:IMPLEMENTED

Given User have chosen a date on the calendar page
and click on a Available slot , there must be textbox field to given a reason message.
After given reason, User click on the Confirm Call Button
Then You can see a confirmation message with the date, time, and reason for alloted call and status will be change as 'BOOKED'

#### Scenario 3 : IMPLEMENTED

Given I have chosen a date in the calendar page
When I click on a time slot that has already been allocated to a call Then I see an error message about the allocated
slot

### 2. Data Specifications :

I have to create an array to find and update a specified slots as per the given date and time. So according to given endpoint, an array must be search with year , month and date .
Example :

```
slots[year][month][date] = Array[4, 16, 19] // allotted slots time
```

Final Array :

```
{
  "2022": {
    "0": {
      {
          "7": [
              15
          ],
          "8": [
              21,
              21
          ],
    },
    "1": {
      "3": [
              11
          ],
          "9": [
              2
          ],
    }
    ...
  }
}

```

year : 2022
month: 0 to 11 showing 12 months in object
date: 1 to 31 showing dates
time : 0 to 23 hours

- To Show and Update Status as per every slot of hour :

```
[
  {
    timeSlot: 00:01,
    status : AVAILABLE
  }, ...
]
```

### 3. Storage :

I have decided to store current user's allocations into Browsers LocalStorage. so each time user creates a new allocation, it is stored in localstorage and then it gets loaded & merged into current timeslots received from backend.

- Improvement :
  I can might be try to implement MongoDb for updatation.

### 4. Redux-Saga :

I have implemented redux-saga concept for Date fetching from enpoint and Updating Data on database.
redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

## Third Party Libraries

- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [React / create-react-app](https://github.com/facebook/create-react-app)
- [Redux](https://redux.js.org/)
- [Redux-saga](https://redux-saga.js.org/)
- [sass](https://sass-lang.com/install) for CSS extension
- [React-Toastify](https://openbase.com/js/react-toastify) for notifications
- [Axios](https://github.com/axios/axios) for api calls.
- [Jest](https://jestjs.io/) for testing
- [Enzyme](https://airbnb.io/enzyme/) for testing
- [enzyme-adapter-react-16](https://enzymejs.github.io/enzyme/docs/installation/react-16.html) an adapter between React and Enzyme. This will be executed before running the tests.
- [React Icons](https://react-icons.github.io/react-icons) for icons

## Improvement Scope:

If I had a little more time to invest on this code assignment, I would probably
focus on:

- Time zone Implementation
- changes on slot time according to TimeZone
- Implementation of MongoDb
- more test cases on redux

## Project commands

### Install dependencies

```zsh
npm i
```

### Running the project

```zsh
# (make sure dependencies have been installed before.)
npm start
```

### Executing tests

This project contains an extensive suite of tests and makes use of [Jest](https://jestjs.io/) and [Enzyme](https://github.com/airbnb/enzyme).

Run all tests by executing.

```zsh
# (make sure dependencies have been installed before.)
npm test
```

Or

```zsh
npm run test -- -u
```
