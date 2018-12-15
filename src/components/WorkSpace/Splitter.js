import React from 'react';
import {connect} from 'react-redux';
import '../View/View.css';
import { SPLITTER_DRAG_START, SPLITTER_DOUBLE_CLICKED } from '../../constants/actionTypes';
import { splitterWidth, splitterTitleHorizontal } from '../../constants/style';
import { getWidthById } from '../../utils/cssUtils';

const mapDispatchToProps = dispatch => ({
    onMouseDown: payload =>
        dispatch({type: SPLITTER_DRAG_START, payload}),
    onDoubleClick: payload =>
        dispatch({type: SPLITTER_DOUBLE_CLICKED, payload})
})

const mapStateToProps = (state, ownProps) => ({
    secondViewWidth: state.workspace.views[ownProps.secondIndex].sizes.widthPercent
})

const Splitter = props => {
    const {firstView,
        secondView,
        firstIndex,
        secondIndex
    } = props;
    
    const onDoubleClick = e => {
        props.onDoubleClick({
            secondIndex: secondIndex
        })
    }
    const onMouseDown = e => {
        e.preventDefault();
        const workspaceWidth = getWidthById("workspace")
        const payload = {
            startPosition: e.pageX * 100 / workspaceWidth,
            firstViewWidth: firstView.sizes.widthPercent,
            secondViewWidth: secondView.sizes.widthPercent,
            firstIndex: firstIndex,
            secondIndex: secondIndex,
        };
        props.onMouseDown(payload)
    }
    const transform = secondView.sizes.widthPercent < 7 ? splitterTitleHorizontal : "none";
    if (props.canMove){
        return (
        <div className="view-splitter" 
            style={
                {
                    cursor: "col-resize",
                    width: splitterWidth
                }
            }
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}>
            <h2 className="view-splitter-title"
                style={{
                    transform: transform
                }}>
                {props.title}
            </h2>
        </div>
        )
    }
    return (
        <div className="view-splitter" 
            style={
                {
                    cursor: "default",
                    width: splitterWidth
                }
            }>
            <h2 className="view-splitter-title"
                style={{
                    transform:transform
                }}>
                {props.title}
            </h2>
        </div>
        )
    
}

export default connect(() => mapStateToProps, mapDispatchToProps)(Splitter)