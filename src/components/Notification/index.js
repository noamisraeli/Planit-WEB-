import React from 'react';
import { returnAsSeconds } from '../../utils/cssUtils';
import './Notification.css'
import { queueHeadersStyle } from '../../constants/style';

class Notification extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isDisplayed:true
        }
    }

    componentDidMount(){
        this.setState({isDisplayed:false})
    }

    componentDidUpdate(prevProps){
        if(this.props.content !== prevProps.content){
            this.setState({isDisplayed: true}, () => {setTimeout(() => this.setState({isDisplayed: false}), 1000)})
        }
    }
    render(){
        const additionalStyle = this.state.isDisplayed ? 
        {
            visibility: "visible",
            opacity: 1
        } :
        {
            visibility: "hidden",
            opacity: 0, 
            transition: "visibility 2s , opacity 2s linear",            
        } 
        return (
        <div className="notification"
            style={{
                ...this.props.style,
                ...additionalStyle
            }}>
            {this.props.content}
        </div>
        )
    }
}


export default Notification