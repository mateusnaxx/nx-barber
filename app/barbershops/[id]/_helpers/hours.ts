import { addMinutes, format, setHours, setMinutes } from "date-fns";

export function generateDayTimeList(date: Date): string[] {
    const startTime = setMinutes(setHours(date, 9), 0)
    const endTime = setMinutes(setHours(date, 21), 0)
    const interval = 45
    const timelist: string[] = []

    let currentTime = startTime

    while (currentTime <= endTime) {
        timelist.push(format(currentTime, "HH:mm"))
        currentTime =  addMinutes(currentTime, interval)
    }
    
    return timelist
}