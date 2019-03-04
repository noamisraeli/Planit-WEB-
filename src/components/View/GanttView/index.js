import React from 'react';
import {GanttViewPropTypes} from '../../WorkSpace/propTyps'
import {
	GANTT_VIEW_LOADED, 
    GANTT_VIEW_UNLOADED,
    SCROLL_CHANGED,
    RESOLUTION_CHANGED,
} from '../../../constants/actionTypes';
import {connect} from 'react-redux'
import Queue from '../Queue';
import Notification from '../../Notification';
import '../View.css';
import '../GanttView/GanttView.css';
import { getHourAsPixels, getPixelsAsHour } from '../../../utils/ganttUtils';
import { queueStyle, queueHeaderStyle, queueHeadersStyle, queueContainerStyle, ganttNotificationStyle} from '../../../constants/style';
import { JOB} from '../../../constants/configurations/commonConfiguration';
import QueueHeaderContainer from '../Queue/QueueHeaderContainer';
import QueueHeader from '../Queue/QueueHeader';
import QueueContainer from '../Queue/QueueContainer';

const mapStateToProps = (state, ownProps) => ({
    startTimeView: state.workspace.views[ownProps.index].startTimeView,
    selectedJobs: state.workspace.views[ownProps.index].selectedJobs,
    notification: state.workspace.views[ownProps.index].notification,
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
        dispatch({type: GANTT_VIEW_UNLOADED, viewId})
})

class GanttView extends React.Component {
    componentWillUnMount(){
        this.props.Unload(this.props.id)
    }
    
    setScrollState(ganttNode){
        ganttNode.scrollLeft = getHourAsPixels(this.props.startTime, this.props.startTimeView, this.props.hourAsPixel, true)
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
            this.props.hourAsPixel,
            false)
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

    render(){
        if(this.props.jobs){
        return (
                <div className="gantt-view">
                    <Notification 
                        content={this.props.notification.content} 
                        style={{
                            left: queueHeadersStyle.width + ganttNotificationStyle.left, 
                            bottom: ganttNotificationStyle.bottom}}/>
                    <QueueHeaderContainer
                        style={{...queueHeadersStyle,
                        }}>
                        {this.props.queues.map((queue, index) => {
                            return (
                                <QueueHeader 
                                    key={index}
                                    style={{
                                        height: queueStyle.height,
                                        ...queueHeaderStyle
                                    }}>
                                    {queue.additionalParams.title}
                                </QueueHeader> 
                            )
                        })}
                    </QueueHeaderContainer>
                    <QueueContainer 
                        style={{
                            ...queueContainerStyle
                        }}
                        onScroll={this.handleScroll}
                        onWheel={this.handleWheel}
                        ref="gantt">
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
                                                && this.props.draggedComponent.sourceViewId === this.props.id 
                                                ? this.props.draggedComponent.id : null}/>
                            )})
                        }
                    </QueueContainer>          
            </div>
        )
    }
    return null
}

}

GanttView.propTypes = GanttViewPropTypes;

export default connect(mapStateToProps, mapDispatchToProps)(GanttView)



