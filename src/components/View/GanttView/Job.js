import React from 'react';
import { JOB_DRAG_START, JOB_SELECT, OPEN_MODAL} from '../../../constants/actionTypes';
import {connect} from 'react-redux';
import {JobPropTypes} from '../../WorkSpace/propTyps';

const mapDispatchToProps = dispatch => ({
    dragStart: payload =>
        dispatch({ type: JOB_DRAG_START, payload}),
    onClick: jobId =>
        dispatch({type: JOB_SELECT, jobId}),
    openModal: payload => 
        dispatch({type: OPEN_MODAL, payload})
})


const Job = props => {
    const {
        additionalParams,
        startTime,
        endTime,
        style,
        id
    } = props;
    // const topToolTip = {
    //     borderWidth: "5px",
    //     borderStyle: "solid",
    //     borderColor:  " #555 transparent transparent transparent",
    // }
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
            
            className="job-container"
            style={style}
            >
            <div className="job"
                style={{
                    backgroundColor: additionalParams.orderColor
                }}>
                {/* <div className="tooltiptext bottom-tooltip">
                    <div>Start time: {startTime.toLocaleString()}</div>
                    <div>End time: {endTime.toLocaleString()}</div>
                </div>
                 */}
            </div>
            
            </div>
        )

    
}

Job.propTypes = JobPropTypes;

export default connect(() => ({}), mapDispatchToProps)(Job);
