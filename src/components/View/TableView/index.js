import React from 'react';
import {connect} from 'react-redux';
import './TableView.css';

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
                    <tr className="table-view-container-row">
                        {this.props.tableHeaders.map(headerName => {
                            return <th className="table-view-container-row-cell">{headerName}</th>
                        })}
                    </tr>
                    {this.props.jobs.map(job => {
                        const {description, quantity, order} = job.additionalParams;
                        const queueId = job.dependencies.jobQueue;
                        const row = [job.id, description, order, queueId, quantity, job.startTime.toLocaleString(), job.endTime.toLocaleString()]
                        return (
                            <tr className="table-view-container-row">
                                {row.map(cellContent => {
                                    return <td className="table-view-container-row-cell content">{cellContent}</td>
                                })}
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
        }
    }
}

export default connect(mapStateToProps)(TableView)