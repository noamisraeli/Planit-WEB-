import PropTypes from 'prop-types';


export const Job = PropTypes.shape({
    jobId: PropTypes.string,
    orderId: PropTypes.string,
    description : PropTypes.string,
    quantity: PropTypes.number,
    nextJob: Job,
    style: PropTypes.object,
})

export const Resource = PropTypes.shape({
    jobs: PropTypes.arrayOf(Job).isRequired,
    style : PropTypes.object,
    resourceId: PropTypes.string.isRequired,

})

export const Gantt = PropTypes.shape({
    resources : PropTypes.arrayOf(Resource).isRequired
})
