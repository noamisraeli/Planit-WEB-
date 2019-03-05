import { START_TIME, END_TIME } from "../constants/configurations/commonConfiguration";

export const buildTitle = (startTime, endTime) => {
    return START_TIME + ": " + startTime.toLocaleString() + "\n"  + END_TIME + ": " + endTime.toLocaleString()
}