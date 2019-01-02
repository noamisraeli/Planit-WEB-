import React from 'react';
import { JOB_DRAG_START, JOB_SELECT, OPEN_MODAL} from '../../../constants/actionTypes';
import {connect} from 'react-redux';
import {JobPropTypes} from '../../WorkSpace/propTyps';
import { JOB_PROPS_TITLE, JOB_PROPS_WIDTH, PROPS_MODAL_TYPE } from '../../../constants/configurations/modalConfiguration';
import { START_TIME, END_TIME } from '../../../constants/configurations/commonConfiguration';

const mapDispatchToProps = dispatch => ({
    onDragStart: payload =>
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
    const onDragStart = (e) => {
        props.onDragStart({jobId:id, 
            viewId:viewId, 
            style:{
                width: e.target.offsetWidth,
                height: e.target.offsetHeight,
                backgroundColor: additionalParams.bgColor,
                left: e.pageX,
                top: e.pageY
        }})
    }
    return (
        <div
            title={START_TIME + ": " + expandedProps.startTime + "\n"  + END_TIME + ": " + expandedProps.endTime}
            onDoubleClick={() => props.openModal({
                content: expandedProps,
                type: PROPS_MODAL_TYPE,
                id: id,
                title: JOB_PROPS_TITLE,
                width: JOB_PROPS_WIDTH
            })
            }
            onClick={(e) => props.onClick({jobId:id, viewId:viewId, withCtrlKey:e.ctrlKey})}
            onMouseDown={onDragStart}
            className="job-container"
            style={style}
            >
            <div className="job"
                style={{
                    backgroundColor: additionalParams.bgColor,
                    display: additionalParams.display
                }}
                id={id}
                draggable>
            </div>
            
            </div>
        )

    
}

Job.propTypes = JobPropTypes;

export default connect(() => ({}), mapDispatchToProps)(Job);
