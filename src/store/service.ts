import axios from 'axios';

export const AXIOS_URL = 'https://private-anon-3947622ccf-cfcalendar.apiary-mock.com/mentors/1/agenda'

export const fetchSlots  = () => axios.get(AXIOS_URL);

