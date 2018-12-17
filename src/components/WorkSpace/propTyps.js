import PropTypes from 'prop-types'

export const ParamsPropTypes = PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    order: PropTypes.number,
    quantity: PropTypes.number
})

export const JobPropTypes = {
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    dependencies: PropTypes.shape({
        nextJob: PropTypes.number,
        jobType: PropTypes.string,
        jobQueue: PropTypes.number,
    }),
    witdh: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    additionalParams: ParamsPropTypes
}


export const QueuePropTypes = {
    jobs: PropTypes.arrayOf(PropTypes.shape(JobPropTypes)),
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    settings: PropTypes.shape({
        jobTypesAllowed: PropTypes.arrayOf(PropTypes.string),
        numberOfParallelJobs: PropTypes.number,
    }),
    additionalParams: ParamsPropTypes
}

export const GanttViewPropTypes = {
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    settings: PropTypes.shape({
        jobHieght: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        witdh: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        minWidth: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        minHeight: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        hourAsPixel: PropTypes.number
    }),
    filters: PropTypes.shape({
        queueFilter: PropTypes.array,
        jobFilter: PropTypes.object
    }),
    sortQueuesBy: PropTypes.oneOf(["queueName", "numberOfJobs", "bgColor"])
}

export const OperatorPropTypes = {

}

export const GanttPropTypes = {
    jobs: PropTypes.arrayOf(JobPropTypes),
    queues: PropTypes.arrayOf(QueuePropTypes),
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    operators: PropTypes.arrayOf(OperatorPropTypes),
    ganttViews: PropTypes.arrayOf(GanttViewPropTypes)
}

