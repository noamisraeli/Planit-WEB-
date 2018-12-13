import React from 'react';

const Day = (props) => {
    const minWidth = 25;
    const {
        width,
        style,
        hoursFilter,
        name,
        date
            } = props;
            
    const filterHours = (hour) => {
        return hoursFilter.indexOf(houur)     
    }
    filteredHours = hours.filter(filterHours)
    const style = {
        width: width,
        
    }
    return (
        <div style={style}>

        </div>
    )
}

export default Day;