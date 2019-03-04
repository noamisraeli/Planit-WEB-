import React from 'react';

const QueueHeader = props => {
    const {children, style, onClick} = props;
    return (
        <div className="queue-header"
            style={style}
            onClick={onClick}>
            {children}
        </div>
    )
}

export default QueueHeader;