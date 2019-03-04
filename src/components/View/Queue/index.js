import React from 'react';
import {QueuePropTypes} from '../../WorkSpace/propTyps'
import Job from '../Job';
import {getHourAsPixels} from '../../../utils/ganttUtils'
import { queueStyle, selectedJobStyle, draggedJobStyle } from '../../../constants/style';
import { GANTT_JOB } from '../../../constants/configurations/commonConfiguration';


const Queue = props => {
    const {
        jobs,
        startTime,
        endTime,
        hourAsPixel,
        viewId,
        selectedJobs,
        draggedJobID,
        ...additionalProps
    } = props;
    const width = getHourAsPixels(endTime, startTime, hourAsPixel);
    let initialTime = startTime;
    return (
        <div 
            className="queue"
            style={{
                width: width,
                color: "white",
                ...queueStyle
            }}
            {...additionalProps}
            >
            {jobs.map((job, index) => {
                const position = getHourAsPixels(job.startTime, initialTime, hourAsPixel)
                const jobWidth = getHourAsPixels(job.endTime, job.startTime, hourAsPixel)
                const jobStyle = {
                    width: jobWidth,
                    marginLeft: position
                }
                job.additionalParams.bgColor = selectedJobs.includes(job.id) ? selectedJobStyle.backgroundColor : job.additionalParams.orderColor
                job.additionalParams.display = draggedJobID === job.id ? draggedJobStyle.display: jobStyle.display;
                initialTime = job.endTime;
                return (
                    <Job 
                        type={GANTT_JOB}
                        id={job.id}
                        key={index}
                        startTime={job.startTime}
                        endTime={job.endTime}       
                        viewId={viewId}
                        dependencies={job.dependencies}
                        additionalParams={job.additionalParams}
                        style={jobStyle}
                    />)
            } )}
        </div>
    )
}

Queue.propTypes = QueuePropTypes;

export default Queue;