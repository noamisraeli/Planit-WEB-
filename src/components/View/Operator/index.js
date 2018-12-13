import React from 'react';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick : payload => 
        dispatch({type: ownProps.action, payload})
})
const Operator = props => {
    return (
        <div className="view-operator" 
            style={{display:"inline-block", 
                    float:props.position,
                    padding: 3,
                cursor:"pointer"}}
            title={props.title} 
            onClick={e => props.onClick({viewId:props.viewId, ...props.additionalParams})}>
            <i className="material-icons">{props.type}</i>
        </div>
    )
}

export default connect(() => ({}), mapDispatchToProps)(Operator);
