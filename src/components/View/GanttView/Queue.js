import React from 'react';
import {QueuePropTypes} from '../../WorkSpace/propTyps'
import Job from './Job';
import {getHourAsPixels} from '../../../utils/ganttUtils'
import {connect} from 'react-redux'
import { queueStyle, selectedJobStyle } from '../../../constants/style';


const Queue = props => {
    const {
        jobs,
        startTime,
        endTime,
        hourAsPixel,
        viewId,
        selectedJobs
    } = props;
    const onDragOver = (e) => {
        e.preventDefault()
    }
    const width = getHourAsPixels(endTime, startTime, hourAsPixel);
    let initialTime = startTime;
    return (
        <div 
            onDragover={onDragOver}
            className="queue"
            style={{
                width: width,
                color: "white",
                ...queueStyle
            }}
            >
            {jobs.map((job, index) => {
                const position = getHourAsPixels(job.startTime, initialTime, hourAsPixel)
                const jobWidth = getHourAsPixels(job.endTime, job.startTime, hourAsPixel)
                const jobStyle = {
                    width: jobWidth,
                    marginLeft: position
                }
                job.additionalParams.bgColor = selectedJobs.includes(job.id) ? selectedJobStyle.backgroundColor : job.additionalParams.orderColor
                initialTime = job.endTime;
                return (
                    <Job 
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

export default connect(() => ({}))(Queue);