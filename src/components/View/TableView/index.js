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
    render(){
        return (
            <div className="table-container">
                <div className="tabble-view-table">

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(TableView)