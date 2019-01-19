import React from 'react';
import { JOB_DRAG_START, JOB_SELECT, OPEN_MODAL} from '../../../constants/actionTypes';
import {connect} from 'react-redux';
import {JobPropTypes} from '../../WorkSpace/propTyps';
import { JOB_PROPS_TITLE, JOB_PROPS_WIDTH, PROPS_MODAL_TYPE } from '../../../constants/configurations/modalConfiguration';
import { START_TIME, END_TIME } from '../../../constants/configurations/commonConfiguration';
import { jobStyle } from '../../../constants/style';

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
    let mouseTimeout;
    const onDragStart = (e) => {
        const rect = e.target.getBoundingClientRect()
        const mouseRelativePosition =  {
            x: e.pageX - rect.left, 
            y: e.pageY - rect.top
        }
        const width = e.target.offsetWidth;
        const height = e.target.offsetHeight;
        mouseTimeout = setTimeout( () => {props.onDragStart({jobId:id, 
            viewId:viewId,
            mouseRelativePosition: mouseRelativePosition,
            style:{
                width: width,
                height: height,
                backgroundColor: additionalParams.bgColor,
                left: rect.left,
                top: rect.top,
                border: jobStyle.border,
                borderRadius: jobStyle.borderRadius,
                boxShadow: jobStyle.boxShadow
        }})}, 300);
    }
    const onClick = (e) => {
        clearTimeout(mouseTimeout); 
        props.onClick({jobId:id, viewId:viewId, withCtrlKey:e.ctrlKey});
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
            onClick={onClick}
            onMouseDown={onDragStart}
            className="job-container"
            style={style}
            >
            <div className="job"
                style={{
                    backgroundColor: additionalParams.bgColor,
                    display: additionalParams.display,
                    ...jobStyle
                }}
                id={id}
                draggable>
            </div>
            
            </div>
        )

    
}

Job.propTypes = JobPropTypes;

export default connect(() => ({}), mapDispatchToProps)(Job);
