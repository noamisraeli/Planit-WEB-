import React from 'react';

const QueueHeaderContainer = props => {
    const {style, children} = props;
    return (
        <div className="queue-header-container"
            style={style}>
            {children}
        </div>
    )
}

export default QueueHeaderContainer;