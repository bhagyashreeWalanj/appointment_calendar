import { eachHourOfInterval, format, addDays, startOfWeek} from'date-fns'

import {status} from '../actions/constants'

export const initData =(slotsData: any):any =>{
    const segregatedSlots: any = {};

    slotsData.calendar.forEach((element : any) => {
        const slotDateTime = new Date(element.date_time);
        const year = slotDateTime.getFullYear();
        const month = slotDateTime.getMonth();
        const day = slotDateTime.getDate();
        
        if(!segregatedSlots[year]){segregatedSlots[year] = {};};
        if(!segregatedSlots[year][month]){segregatedSlots[year][month] = {}};

        if(!segregatedSlots[year][month][day]){
            segregatedSlots[year][month][day] = [slotDateTime.getHours()]
        }else{
            segregatedSlots[year][month][day].push(slotDateTime.getHours())
        }
    });

    return segregatedSlots;
}

export const compareTwoDates = (dt1: Date, dt2: Date) => {
    const date1 = (new Date(dt1)).setHours(0,0,0,0);
    const date2 = (new Date(dt2)).setHours(0,0,0,0);
    return date1 > date2;
};

/*
slotTimes: number[] = [6, 12, 19]
selectedDateTime: Date = Fri Jul 15 2022 12:49:38 GMT+0200
*/
export const getAllSlotsWithStatus = (slotsInHrsArray: number[], selectedDateTime: Date) => {
   const allocatedSlots = getAllocatedSlotsForDate(selectedDateTime);
    const todayDt = new Date();
    const currentHour = todayDt > selectedDateTime ? todayDt.getHours() : -1;
    const allTimeSlots: any = [];
    const hourDiffArray = getTimeDifferByHour();
      hourDiffArray.forEach((date, index) => {
        const dt = new Date(date)
      //  const nextHour = addHours(dt, 1);
        const hour = dt.getHours();
        let formattedTime = formatHourTime(dt)
        allTimeSlots.push({
            hour:hour,
            timeSlot: formattedTime,
            status: ((slotsInHrsArray && slotsInHrsArray.includes(hour)) || hour<=currentHour)
            ? status.NOT_AVAILABLE : (allocatedSlots.includes(hour) ?  status.BOOKED : status.AVAILABLE)
        });
      });
    return allTimeSlots;
};

export const getAllocatedSlotsForDate= (selectedDateTime: Date) : number[] =>{
    const allocatedSlotsString = localStorage.getItem(selectedDateTime.getDate().toString());
    return allocatedSlotsString?allocatedSlotsString.split(",").map(Number):[]
}

/*
getTimeDifferByHour Response : 
(24) [Tue Feb 01 2022 00:00:00 GMT+0100 (Central European Standard Time), 
    Tue Feb 01 2022 01:00:00 GMT+0100 (Central European Standard Time), 
    
    ...
     Tue Feb 01 2022 22:00:00 GMT+0100 (Central European Standard Time) 
     Tue Feb 01 2022 23:00:00 GMT+0100 (Central European Standard Time) {}length: 24[[Prototype]]: Array(0)

*/
const getTimeDifferByHour =()=>{
    var result = eachHourOfInterval({
        start: new Date(2022, 1, 1, 0),
        end: new Date(2022, 1, 1, 23)
      })
      return result;
}

const formatHourTime = (dt: Date) => {
   return  `${format(dt, 'HH:00')}`
};

export const getWeekNames=(today: Date)=>{
    const startDate = startOfWeek(today, { weekStartsOn: 0 })
    const dayFormat = 'eee'
    const weeks: any = []

    for (let i = 0; i < 7; i++) {
      weeks.push(format(addDays(startDate, i), dayFormat))
    }
    return weeks;
}