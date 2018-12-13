import React from 'react';
import './Modal.css'
import {connect} from 'react-redux';
import {CLOSE_MODAL} from '../../constants/actionTypes';
import KeyValueTable from '../Table/KeyValueTable'

const mapStateToProps = state => ({
    content: state.workspace.modal.content,
    isOpen: state.workspace.modal.isOpen,
    type: state.workspace.modal.type,
    id: state.workspace.modal.id,
    title: state.workspace.modal.title
})

const mapDispatchToProps = dispatch => ({
    onClick: () =>
        dispatch({type: CLOSE_MODAL})
})

class Modal extends React.Component {
    render(){
        if (this.props.isOpen){
            const keyValueArray = Object.keys(this.props.content).map(key => {
                return {
                    key: key,
                    value: this.props.content[key]
                }
            })
            return(
                
            <div 
                className="modal"
                onClick={() => this.props.onClick()}
                >
                <div className="modal-content">
                <span className="close" onClick={() => this.props.onClick()}>&times;</span>
                <div>{this.props.title}</div>
                    <KeyValueTable 
                        keyValueArray={keyValueArray}
                        id={this.props.id}
                    />                    
                </div>

            </div>

            )
        }
        return null
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)