import React from 'react';
import {connect} from 'react-redux';
import { JOB_DRAG_START, JOB_SELECT, OPEN_MODAL } from '../../../constants/actionTypes';
import { START_TIME, GANTT_JOB, TABLE_JOB, END_TIME, JOB } from '../../../constants/configurations/commonConfiguration';
import { PROPS_MODAL_TYPE, JOB_PROPS_TITLE, JOB_PROPS_WIDTH } from '../../../constants/configurations/modalConfiguration';
import '../View.css';

const mapDispatchToProps = dispatch => ({
    onDragStart: payload =>
        dispatch({ type: JOB_DRAG_START, payload}),
    onClick: payload =>
        dispatch({type: JOB_SELECT, payload}),
    openModal: payload => 
        dispatch({type: OPEN_MODAL, payload})
});

class Job extends React.Component {
    constructor(props){
        super(props);
        this.mouseTimeout = null;
    }

    onDragStart = (e) => {
        const draggedElement = e.target.classList.contains(JOB) ? e.target : e.target.parentElement;
        const rect = draggedElement.getBoundingClientRect()
        const mouseRelativePosition =  {
            x: e.pageX - rect.left, 
            y: e.pageY - rect.top
        }
        const copyOfDraggedElement = draggedElement.cloneNode(true);
        const width = draggedElement.offsetWidth;
        const height = draggedElement.offsetHeight;
        this.mouseTimeout = setTimeout(
            () => {
                document.getElementsByClassName("dragged-element")[this.props.viewId - 1].append(copyOfDraggedElement);
                this.props.onDragStart(
                    {
                        jobId: this.props.id, 
                        viewId: this.props.viewId,
                        mouseRelativePosition: mouseRelativePosition,
                        style:{
                            width: width,
                            height: height,
                            left: rect.left,
                            top: rect.top,
                        }
                    }
                )
            }
        , 300);
    }

    onClick = (e) => {
        clearTimeout(this.mouseTimeout); 
        this.props.onClick({jobId:this.props.id, viewId:this.props.viewId, withCtrlKey:e.ctrlKey});
    }

    onModalOpen = () => {
        const content = Object.assign(this.props.additionalParams, {
            startTime: this.props.startTime.toLocaleString(),
            endTime: this.props.endTime.toLocaleString()
        });
        this.props.openModal({
            content: content,
            type: PROPS_MODAL_TYPE,
            id: this.props.id,
            title: JOB_PROPS_TITLE,
            width: JOB_PROPS_WIDTH
        })
    }

    buildTitle = () => {
        return START_TIME + ": " + this.props.startTime.toLocaleString() + "\n"  + END_TIME + ": " + this.props.endTime.toLocaleString()
    }

    renderGanttJob = () => {
        return (
            <div
                title={this.buildTitle()}
                onDoubleClick={this.onModalOpen}
                onClick={this.onClick}
                onMouseDown={this.onDragStart}
                className="gantt-job-container"
                style={this.props.style}
                >
                <div className="gantt-job job"
                    style={{
                        backgroundColor: this.props.additionalParams.bgColor,
                        display: this.props.additionalParams.display,
                    }}
                    id={this.props.id}
                    >
                </div>
            </div>
        )
    }

    renderTableJob = () => {
        return (
            <tr className="table-view-container-row job"
                onClick={this.onClick}
                onMouseDown={this.onDragStart}
                onDoubleClick={this.onModalOpen}>
                {this.props.rowContent.map((cellContent, index) => {
                    return <td
                                key={index} 
                            className="table-view-container-row-cell content" 
                            style={{backgroundColor: this.props.additionalParams.bgColor}}>
                            {cellContent}
                            </td>
                })}
            </tr>
        )
    }

    render(){
        switch(this.props.type){
            case(GANTT_JOB):
                return this.renderGanttJob();
            case(TABLE_JOB):
                return this.renderTableJob();
            default:
                return null
        }
    }
}

export default connect(() => ({}), mapDispatchToProps)(Job);