import React from 'react';

const GanttJob = props => {
    const {title, onDoubleClick, onClick, onMouseDown, style} = props;
    return (
        <div
            title={title}
            onDoubleClick={onDoubleClick}
            onClick={onClick}
            onMouseDown={onMouseDown}
            className="gantt-job-container"
            style={style}>        
        </div>
    )
}

export default GanttJob;