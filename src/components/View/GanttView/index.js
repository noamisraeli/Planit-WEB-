import React from 'react';
import {GanttViewPropTypes} from '../../WorkSpace/propTyps'
import {
	GANTT_VIEW_LOADED, 
    GANTT_VIEW_UNLOADED,
    SCROLL_CHANGED,
    RESOLUTION_CHANGED,
    JOB_DRAG_OVER,
    JOB_DROP
} from '../../../constants/actionTypes';
import {connect} from 'react-redux'
import Queue from './Queue';
import '../View.css';
import { getHourAsPixels, getPixelsAsHour } from '../../../utils/ganttUtils';
import { queueStyle, queueHeaderStyle, queueHeadersStyle, ganttStyle, draggedJobStyle} from '../../../constants/style';
import { JOB, QUEUE } from '../../../constants/configurations/commonConfiguration';
import { getElementByMouesPosition } from '../../../utils/domUtils';

const mapStateToProps = (state, ownProps) => ({
    startTime: state.workspace.startTime,
    endTime: state.workspace.endTime,
    hourAsPixel: state.workspace.views[ownProps.index].sizes.hourAsPixel,
    startTimeView: state.workspace.views[ownProps.index].startTimeView,
    freeTextFilter: state.workspace.views[ownProps.index].filters.freeTextFilter,
    selectedJobs: state.workspace.views[ownProps.index].selectedJobs,
    dragState: state.workspace.views[ownProps.index].dragState,
    draggedComponent: state.workspace.draggedComponent
  });

const mapDispatchToProps = dispatch => ({
    onLoad: payload => 
        dispatch({type: GANTT_VIEW_LOADED, payload}),
    onScroll: payload => 
        dispatch({type: SCROLL_CHANGED, payload}),
    onResolutionChange: payload => 
        dispatch({type: RESOLUTION_CHANGED, payload}),
    onUnload: viewId => 
        dispatch({type: GANTT_VIEW_UNLOADED, viewId}),
    onJobDragOver: payload => 
        dispatch({type: JOB_DRAG_OVER, payload}),
    onJobDrop: payload =>
        dispatch({type: JOB_DROP, payload})
})

class GanttView extends React.Component {
    componentWillUnMount(){
        this.props.Unload(this.props.id)
    }
    
    setScrollState(ganttNode){
        ganttNode.scrollLeft = getHourAsPixels(this.props.startTime, this.props.startTimeView, this.props.hourAsPixel)
    }
    componentDidMount(){
        this.setScrollState(this.refs.gantt)
    }   
    
    componentDidUpdate(){
       this.setScrollState(this.refs.gantt)
    }

    handleScroll =(e) => { 
        let newState = e.target.scrollLeft;
        if (e.deltaY !== undefined){
            newState += e.deltaY
        }
        const newStartTimeView = getPixelsAsHour(
            newState, 
            this.props.startTime, 
            this.props.hourAsPixel)
        this.props.onScroll({
            newState: newStartTimeView,
            viewId: this.props.id
        })
    }

    handleWheel = (e) => {
        e.preventDefault()
        if (e.ctrlKey){
            this.props.onResolutionChange({diff: e.deltaY * 0.6,
                viewId: this.props.id});
                    return
                }
        else{
            this.handleScroll(e)
        }
    }

    onJobDrop = (e) => {
        e.preventDefault()
        if (this.props.draggedComponent.isDragged){
            this.props.onJobDrop()
            const dropTarget = getElementByMouesPosition(e.pageX, e.pageY, [QUEUE], false)
            if (dropTarget){
                alert("You just droped your job to queue: " + dropTarget.id)
            }
		}
    }

    onJobDragOver = (e) => {
        e.preventDefault()
        if(this.props.draggedComponent.isDragged){
            this.props.onJobDragOver({
                style: {
                    left: e.pageX - this.props.draggedComponent.mouseRelativePosition.x,
                    top: e.pageY - this.props.draggedComponent.mouseRelativePosition.y
                }
            })
        }
    }

    render(){
        if(this.props.jobs){
        return (
                <div className="gantt-container"
                    onMouseMove={this.onJobDragOver}
                    onMouseUp={this.onJobDrop}>
                    <div className="dragged-element" 
					style={{
						...this.props.draggedComponent.style, 
						display: this.props.draggedComponent.isDragged ? "block": draggedJobStyle.display}}>
			        </div>
                    <div style={{
                        ...queueHeadersStyle,
                        color: "white"
                    }}>
                        {this.props.queues.map((queue, index) => {
                            return (
                                <div style={{
                                    height: queueStyle.height,
                                    ...queueHeaderStyle
                                }}
                                key={index}>
                                {queue.additionalParams.title}
                                </div>
                            )
                        })
                    } </div>                  
                    <div 
                        className="gantt-view-gantt"
                        style={{
                        ...ganttStyle
                    }}
                        onScroll={this.handleScroll}
                        onWheel={this.handleWheel}
                        ref="gantt"
                    >
                {this.props.queues.map((queue, index) =>{
                    const queueJobs = this.props.jobs.filter((job) => {return job.dependencies.jobQueue === queue.id})
                        return (
                            <Queue
                            onDragOver={this.onDragOver}
                            key={index}
                            id={queue.id}
                            viewId={this.props.id}
                            jobs={queueJobs}
                            hourAsPixel={this.props.hourAsPixel}
                            startTime={this.props.startTime}
                            endTime={this.props.endTime}
                            selectedJobs={this.props.selectedJobs}             
                            draggedJobID={this.props.draggedComponent.compType === JOB 
                                                && this.props.draggedComponent.viewId === this.props.id 
                                                ? this.props.draggedComponent.id : null}/>
                            )
                    }     
                )}
                </div>
            </div>  
        )
    }
    return null
}

}

GanttView.propTypes = GanttViewPropTypes;

export default connect(mapStateToProps, mapDispatchToProps)(GanttView)



