import React from 'react';
import { JOB_DRAG_START, JOB_SELECT, OPEN_MODAL} from '../../../constants/actionTypes';
import {connect} from 'react-redux';
import './TableView.css';

const mapDispatchToProps = dispatch => ({
    onDragStart: payload =>
        dispatch({ type: JOB_DRAG_START, payload}),
    onClick: payload =>
        dispatch({type: JOB_SELECT, payload}),
    openModal: payload => 
        dispatch({type: OPEN_MODAL, payload})
})


const JobRow = props => {
    const {
        additionalParams,
        rowContent,
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
                top: rect.top
        }})}, 300);
    }
    const onClick = (e) => {
        clearTimeout(mouseTimeout); 
        props.onClick({jobId:id, viewId:viewId, withCtrlKey:e.ctrlKey});
    }
    return (
        <tr className="table-view-container-row"
            style={{cursor:"pointer"}}
            onClick={onClick}>
            {rowContent.map(cellContent => {
                return <td className="table-view-container-row-cell content" style={{backgroundColor: additionalParams.bgColor}}>{cellContent}</td>
            })}
        </tr>
        )
}

export default connect(() => ({}), mapDispatchToProps)(JobRow);
