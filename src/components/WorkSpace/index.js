import React, {Component} from 'react'
import './WorkSpace.css'
import agent from '../../agent';
import {connect} from 'react-redux';
import {
	WORKSPACE_LOADED, 
	WORKSPACE_UNLOADED,
 	SPLITTER_DRAG,
	SPLITTER_DRAG_END,
	WORKSPACE_MOUNTED
} from '../../constants/actionTypes';
import Modal from '../Modal';
import View from '../View'
import Splitter from './Splitter';
import { getWidthById } from '../../utils/cssUtils';


const mapStateToProps = state => ({
	...state.workspace,
	views: state.workspace.views,
	splitter: state.workspace.splitter,
	width: state.workspace.width
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
		dispatch({type: SPLITTER_DRAG, payload})
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
				id="workspace"
				onMouseUp={this.onMouseUp}
				onMouseMove={this.onMouseMove}
				ref={this.DOMElement}
			>
			<Modal />
			{this.props.views.map((view, index) => {
						let firstView = this.props.views[index - 1];
						let firstIndex = index - 1;
						return (
								<React.Fragment key={index}>
								<Splitter 
                    canMove={index === 0 ? false : true}
										title={view.type}
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
