import React from 'react';
import { returnAsSeconds } from '../../utils/cssUtils';
import './Notification.css'
import { queueHeadersStyle } from '../../constants/style';

class Notification extends React.Component {

    render(){
        return (
        <div className="notification"
            style={{
                transition: "opacity " + returnAsSeconds(1) ,
                left: 15 + queueHeadersStyle.width,
                bottom :30,
                transitionDelay: "5s"
            }}>
            {this.props.content}
        </div>
        )
    }
}


export default Notification