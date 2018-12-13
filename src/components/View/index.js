import React from 'react';
import GanttView from './GanttView'
import {GANTT_VIEW} from  '../../constants/viewTypes'
import './View.css';
import {connect} from 'react-redux';
import {  VIEW_LOADED,
    QUEUE_FILTER_NAME_CHANGE, 
    GO_TO_FIRST_JOB,
    GO_TO_LAST_JOB} from '../../constants/actionTypes';
import { viewHeaderStyle } from '../../constants/style';
import { returnAsCalcFunction } from '../../utils/cssUtils';
import Operator from './Operator';


const mapStateToProps = (state, ownProps) => ({
    jobs : state.database.jobs,
    queues: state.database.queues,
    width: state.workspace.views[ownProps.index].sizes.widthPercent,
    height: state.workspace.views[ownProps.index].sizes.height,
    freeTextFilter: state.workspace.views[ownProps.index].filters.freeTextFilter,
})

const mapDispatchToProps = dispatch => ({
    onLoadEnd: payload => 
        dispatch({type: VIEW_LOADED, payload}),
    onFreeTextFilterChange: payload => 
        dispatch({type: QUEUE_FILTER_NAME_CHANGE, payload})
})

class View extends React.Component {
    
    QueuesFilterFunction(queue){
        if(queue.additionalParams.title.toLocaleLowerCase()
                .includes(this.props.freeTextFilter.toLocaleLowerCase())){
            return true
        } 
        return false
    }

    _getViewByType = (type, props) => {
        switch (type){
            case GANTT_VIEW:
                return <GanttView 
                            id={props.id}
                            index={props.index} 
                            jobs={props.jobs}
                            queues={props.queues.filter((queue) => this.QueuesFilterFunction(queue))}/> 
            default:
                return <GanttView {...props} />
        }
    }

    onFreeTextInputChange = (e) => {
        this.props.onFreeTextFilterChange({
            viewId: this.props.id,
            newValue: e.target.value
        })
    }

    render(){
        
        const view = this._getViewByType(this.props.type, this.props)  
        return (
            <div 
                className="view-container" 
                style={{
                    width: this.props.width + '%',
                    height: this.props.height
                }}>
                <div className="view-content">
                <div className="view-header">
                </div>
                <div className="view-header">
                    <input 
                            onChange={this.onFreeTextInputChange}
                            placeholder="Queue name filter..."
                            value={this.props.freeTextFilter}/>
                    <Operator 
                        type="fast_forward" 
                        position="right" 
                        title="Go to last job" 
                        action={GO_TO_LAST_JOB} 
                        viewId={this.props.id} 
                        additionalParams={{lastJob:this.props.jobs[this.props.jobs.length - 1]}}/>                    
                    <Operator 
                        type="fast_rewind" 
                        position="right" 
                        title="Go to first job" 
                        action={GO_TO_FIRST_JOB} 
                        viewId={this.props.id} 
                        additionalParams={{firstJob:this.props.jobs[0]}}/>                        
                </div>
                <div className="view-content-container"
                     style={{
                        height: returnAsCalcFunction(100, "-", viewHeaderStyle.height * 2)
                     }}>
                      {view}
                </div>
                </div>
                
            </div>
    )
    }
}





export default connect(mapStateToProps, mapDispatchToProps)(View)