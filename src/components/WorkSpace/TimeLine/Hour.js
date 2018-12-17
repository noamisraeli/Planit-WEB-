import React from 'react';


const Hour = (props) => {
    const minWidth = 25
    const {
        width,
        bgColor
    } = props;
    
    if (width < minWidth){
        return null
    }
    return (
        <div 
            style={{
                minWidth: 25,
                height:"100%",
                backgroundColor: bgColor
                }}
            >
        
        </div>
    )
}

export default Hour;