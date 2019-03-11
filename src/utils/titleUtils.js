import { START_TIME, END_TIME } from "../constants/configurations/commonConfiguration";

const View = {
    buildJobTitle: (startTime, endTime) => {
        return START_TIME + ": " + startTime.toLocaleString() + "\n"  + END_TIME + ": " + endTime.toLocaleString()
    },
    buildJobExpandProps: (additionalParams, startTime, endTime, args) => {
        return Object.assign(additionalParams, {
            START_TIME: startTime.toLocaleString(),
            END_TIME: endTime.toLocaleString()
        })
    }
}

export default View