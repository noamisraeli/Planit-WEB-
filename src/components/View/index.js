import React from 'react';
import './View.css';
import { draggedJobStyle } from '../../constants/style';
import {connect} from 'react-redux';
import { JOB_DRAG_OVER, JOB_DROP } from '../../constants/actionTypes';
import { GANTT_VIEW, TABLE_VIEW } from '../../constants/viewTypes';
import GanttView from './GanttView';
import TableView from './TableView';
import { getElementByMouesPosition, getRelativePositionInElement } from '../../utils/domUtils';
import { QUEUE } from '../../constants/configurations/commonConfiguration';
import { getPixelsAsHour } from '../../utils/ganttUtils';

const mapStateToProps = (state, ownProps) => ({
    selectedJobs: state.workspace.views[ownProps.index].selectedJobs,
    draggedComponent: state.workspace.draggedComponent,
    notification: state.workspace.views[ownProps.index].notification,
    startTime: state.workspace.startTime,
    endTime: state.workspace.endTime,
    hourAsPixel: state.workspace.views[ownProps.index].sizes.hourAsPixel
})

const mapDispatchToProps = dispatch => ({
    onJobDragOver: payload => 
        dispatch({type: JOB_DRAG_OVER, payload}),
    onJobDrop: payload =>
        dispatch({type: JOB_DROP, payload})
})


class View extends React.Component {

    _cleanDraggedElements = () => {
        const draggedElementContainers = document.getElementsByClassName("dragged-element");
        for (let draggedElementContainer of draggedElementContainers){
            if(draggedElementContainer.lastChild){
                draggedElementContainer.removeChild(draggedElementContainer.lastChild)
            }
        }
    }

    onJobDrop = (e) => {
        e.preventDefault()
        if (this.props.draggedComponent.isDragged){
            this._cleanDraggedElements()
            const queueElement = getElementByMouesPosition(e.pageX, e.pageY, [QUEUE], false);
            if (queueElement){
                const positionInQueue = getRelativePositionInElement(e.pageX, queueElement);
                const dropedTimeStamp = getPixelsAsHour(positionInQueue, this.props.startTime, this.props.hourAsPixel, true)     
                alert("You just droped your job to queue: " + queueElement.id + " in position: " + dropedTimeStamp)
            }
            this.props.onJobDrop()
        }
    }

    onJobDragOver = (e) => {
        e.preventDefault()
        if(this.props.draggedComponent.isDragged){
            const queueElement = getElementByMouesPosition(e.clientX, e.clientY, [QUEUE], false);
            const hoveredView = getElementByMouesPosition(e.pageX, e.pageY, ["view-container"], false);
            let notificationContent = this.props.notification.content;
            if (queueElement !== undefined){
                const positionInQueue = getRelativePositionInElement(e.pageX, queueElement);
                notificationContent = positionInQueue ? getPixelsAsHour(positionInQueue, this.props.startTime, this.props.hourAsPixel).toLocaleString() : this.props.notification.content
            }
            this.props.onJobDragOver({
                style: {
                    left: e.pageX - this.props.draggedComponent.mouseRelativePosition.x,
                    top: e.pageY - this.props.draggedComponent.mouseRelativePosition.y
                },
                hoveredViewId: hoveredView !== undefined ? Number(hoveredView.id): null,
                notificationContent: notificationContent
            })
        }
    }

    getViewByType = (viewType) => {

        switch(viewType){
            case GANTT_VIEW:
                return <GanttView 
                            id={this.props.id}
                            index={this.props.index}
                            jobs={this.props.jobs}
                            queues={this.props.queues}
                            hourAsPixel={this.props.hourAsPixel} 
                            startTime={this.props.startTime}
                            endTime={this.props.endTime}/>
            case TABLE_VIEW:
                return <TableView 
                            id={this.props.id}
                            index={this.props.index}
                            jobs={this.props.jobs}/>
            default:
                return <GanttView 
                            id={this.props.id}
                            index={this.props.index}
                            jobs={this.props.jobs}
                            queues={this.props.queues}
                            hourAsPixel={this.props.hourAsPixel} 
                            startTime={this.props.startTime}
                            endTime={this.props.endTime}/>
        }
    }

    render(){
        let draggedElementDisplay = 'none';
        if (this.props.draggedComponent.isDragged && this.props.draggedComponent.sourceViewId === this.props.id){
            draggedElementDisplay = this.props.type === TABLE_VIEW  ? "table" : "block";
        };
        const viewType = this.props.type;
        return (
            <div className="view" 
                onMouseMove={this.onJobDragOver}
                onMouseUp={this.onJobDrop}>
                <div className="dragged-element"
                    style={{
                        ...this.props.draggedComponent.style, 
                        display: draggedElementDisplay}}>
                </div>
                {this.getViewByType(viewType)}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)