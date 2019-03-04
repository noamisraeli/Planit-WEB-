import React from 'react';
import {QueuePropTypes} from '../../WorkSpace/propTyps'

const Queue = props => {
    const {
        style,
        children,
        ...additionalProps
    } = props;
    return (
        <div 
            className="queue"
            style={style}
            {...additionalProps}
            >
            {children}
        </div>
    )
}

Queue.propTypes = QueuePropTypes;

export default Queue;