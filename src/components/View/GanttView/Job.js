import React from 'react';
import { JOB_DRAG_START, JOB_SELECT, OPEN_MODAL} from '../../../constants/actionTypes';
import {connect} from 'react-redux';
import {JobPropTypes} from '../../WorkSpace/propTyps';

const mapDispatchToProps = dispatch => ({
    dragStart: payload =>
        dispatch({ type: JOB_DRAG_START, payload}),
    onClick: payload =>
        dispatch({type: JOB_SELECT, payload}),
    openModal: payload => 
        dispatch({type: OPEN_MODAL, payload})
})


const Job = props => {
    const {
        additionalParams,
        startTime,
        endTime,
        style,
        id,
        viewId
    } = props;
    const expandedProps = Object.assign(additionalParams, {
        startTime: startTime.toLocaleString(),
        endTime: endTime.toLocaleString()
    })
    return (
        <div
            title={expandedProps.startTime + "-" + expandedProps.endTime}
            onDoubleClick={() => props.openModal({
                content: expandedProps,
                type: "job",
                id: id,
                title: "Job properties"
            })
            }
            onClick={() => props.onClick({jobId:id, viewId:viewId})}
            className="job-container"
            style={style}
            >
            <div className="job"
                style={{
                    backgroundColor: additionalParams.orderColor
                }}>
            </div>
            
            </div>
        )

    
}

Job.propTypes = JobPropTypes;

export default connect(() => ({}), mapDispatchToProps)(Job);
