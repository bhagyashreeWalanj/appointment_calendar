
interface IAllottedSlot{
    date_time: string
}
export interface ITimeSlot {
    mentor: {
        name: string,
        time_zone: string
    },
    calendar:IAllottedSlot[]
  }

export interface IDate{
    [key: number]: []
}  
export interface IMonth{
    [key: number]: IDate
} 
export interface ICalendar{
    [key: number]: IMonth
}  