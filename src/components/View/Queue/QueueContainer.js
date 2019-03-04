import React from 'react';

const QueueContainer = props => {
    const {style, children, ...additionalProps} = props;
    return (
        <div 
            className="gantt-view-container"
            style={style}
            {...additionalProps}>
            {children}
        </div>
    )
}

export default QueueContainer;