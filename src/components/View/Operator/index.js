import React from 'react';
import {connect} from 'react-redux';
import { operatorStyle } from '../../../constants/style';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick : payload => 
        dispatch({type: ownProps.action, payload})
})
const Operator = props => {
    return (
        <div className="view-operator" 
            style={{
                float:props.position,
                ...operatorStyle
            }}
            title={props.title} 
            onClick={e => props.onClick({viewId:props.viewId, ...props.additionalParams})}>
            <i className="material-icons">{props.type}</i>
        </div>
    )
}

export default connect(() => ({}), mapDispatchToProps)(Operator);
