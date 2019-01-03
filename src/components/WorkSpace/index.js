import React, {Component} from 'react'
import './WorkSpace.css'
import agent from '../../agent';
import {connect} from 'react-redux';
import {
	WORKSPACE_LOADED, 
	WORKSPACE_UNLOADED,
 	SPLITTER_DRAG,
	SPLITTER_DRAG_END,
	WORKSPACE_MOUNTED,
	ELEMENT_DRAG_OVER,
	ELEMENT_DRAG_END
} from '../../constants/actionTypes';
import Modal from '../Modal';
import View from '../View'
import Splitter from './Splitter';
import { getWidthById } from '../../utils/cssUtils';
import { WORKSPACE } from '../../constants/configurations/commonConfiguration';
import { draggedJobStyle } from '../../constants/style';


const mapStateToProps = state => ({
	...state.workspace,
	views: state.workspace.views,
	splitter: state.workspace.splitter,
	width: state.workspace.width,
	draggedComponent: state.workspace.draggedComponent
  });

const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
	  dispatch({ type: WORKSPACE_LOADED, payload}),
	afterMount: payload => 
		dispatch({type: WORKSPACE_MOUNTED, payload}),
	onUnload: () =>
		dispatch({ type: WORKSPACE_UNLOADED }),
	onSplitterUnCkicked: () => 
		dispatch({type: SPLITTER_DRAG_END}),
	onSplitterDrag: payload => 
		dispatch({type: SPLITTER_DRAG, payload}),
	onElementDragOver: payload =>
		dispatch({type:ELEMENT_DRAG_OVER, payload}),
	onElementDragEnd: () =>
		dispatch({type:ELEMENT_DRAG_END})
  });

class WorkSpace extends Component {
	componentWillUnmount() {
		this.props.onUnload();
	  }
	
	componentWillMount(){
		this.props.onLoad(Promise.all([
			agent.WorkSpace.getViewState()
		])
		)
		this.DOMElement = React.createRef()
	}

  componentDidMount(){
	  console.log(this.DOMElementz)
	//   this.props.afterMount({
	// 	  width: this.current.current.offsetWidth,
	// 	  height: this.current.current.offsetHeight
	//   })
	}

	onMouseUp = e => {
		e.preventDefault()
		if (this.props.splitter.isDragged){
			this.props.onSplitterUnCkicked()
		}
		if (this.props.draggedComponent.isDragged){
			this.props.onElementDragEnd()
		}
	}

	onMouseMove = e => {
		e.preventDefault()
		const workspaceWidth = getWidthById("workspace")
		if(this.props.splitter.isDragged){
			const fullStrech = this.props.splitter.firstWidth + this.props.splitter.secondWidth
			let firstNewWidth = this.props.splitter.firstWidth - (this.props.splitter.startPosition - e.pageX * 100 / workspaceWidth);
			let secondNewWidth = this.props.splitter.secondWidth + (this.props.splitter.startPosition -e.pageX * 100 / workspaceWidth);
			if(firstNewWidth < 0){
				secondNewWidth = fullStrech
				firstNewWidth = 0
			}
			if(secondNewWidth < 0){
				firstNewWidth = firstNewWidth + secondNewWidth
				secondNewWidth = 0
			}
			this.props.onSplitterDrag({
				firstNewWidth: firstNewWidth,
				secondNewWidth: secondNewWidth,
				firstIndex: this.props.splitter.firstIndex,
				secondIndex: this.props.splitter.secondIndex
			})
		}
		if(this.props.draggedComponent.isDragged){
			this.props.onElementDragOver({
				left: e.pageX -  this.props.draggedComponent.mouseRelativePosition.x,
				top: e.pageY - this.props.draggedComponent.mouseRelativePosition.y
			})
		}
	}
	
	render(){
		if(this.props.inProgress){
			return null
		}
		if(!this.props.views){
			return null
		}
		return (
			<div 
				className="workspace"
				id={WORKSPACE}
				onMouseUp={this.onMouseUp}
				onMouseMove={this.onMouseMove}
				ref={this.DOMElement}
			>
			<Modal />
			<div className="dragged-element" style={{...this.props.draggedComponent.style, display: this.props.draggedComponent.isDragged ? "block": draggedJobStyle.display}}>

			</div>
			{this.props.views.map((view, index) => {
						let firstView = this.props.views[index - 1];
						let firstIndex = index - 1;
						return (
								<React.Fragment key={index}>
								<Splitter 
                    canMove={index === 0 ? false : true}
										title={view.type}
										description={view.description}
										firstView={firstView}
										secondView={view}
										firstIndex={firstIndex}
										secondIndex={index}
										/>    
								<View
										key={index}
										id={view.id}
										index={index}
										type={view.type}
										draggedComponent={this.props.draggedComponent}
										{...view}
								/>
								
								</React.Fragment>
						)
					}
				)}
			
			</div>
		)} 	
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkSpace)
