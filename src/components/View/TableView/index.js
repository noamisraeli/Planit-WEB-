import React from 'react';
import {connect} from 'react-redux';
import './TableView.css';
import Job from '../Job';
import { jobRowStyle, selectedJobRowsStyle } from '../../../constants/style';
import { TABLE_JOB } from '../../../constants/configurations/commonConfiguration';

const mapStateToProps = (state, ownProps) => ({
    freeTextFilter: state.workspace.views[ownProps.index].filters.freeTextFilter,
    selectedJobs: state.workspace.views[ownProps.index].selectedJobs,
    notification: state.workspace.views[ownProps.index].notification,
    draggedComponent: state.workspace.draggedComponent
})

class TableView extends React.Component {

    static defaultProps = {
        tableHeaders: ["Job id", "Job description", "Order id", "Queue id", "Quantity", "Start time", "End time"]
    }

    render(){
        if(this.props.jobs){
        return (
            <div className="table-view">
                <table className="table-view-container">
                    <tbody>
                        <tr className="table-view-container-row">
                            {this.props.tableHeaders.map((headerName, index) => {
                                return <th key={index} className="table-view-container-row-cell">{headerName}</th>
                            })}
                        </tr>
                        {this.props.jobs.filter(job => job.id !== this.props.draggedComponent.id).map((job, index) => {
                            const {description, quantity, order} = job.additionalParams;
                            const queueId = job.dependencies.jobQueue;
                            const row = [job.id, description, order, queueId, quantity, job.startTime.toLocaleString(), job.endTime.toLocaleString()]    
                            job.additionalParams.bgColor = this.props.selectedJobs.includes(job.id) ? selectedJobRowsStyle.backgroundColor : jobRowStyle.backgroundColor;
                            return (
                                <Job
                                    type={TABLE_JOB} 
                                    id={job.id}
                                    key={index}
                                    rowContent={row}
                                    additionalParams={job.additionalParams}
                                    viewId={this.props.id}
                                    startTime={job.startTime}
                                    endTime={job.endTime}
                                    />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
        }
    }
}

export default connect(mapStateToProps)(TableView)