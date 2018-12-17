import React from 'react';
import Day from './Day'

const Month = (props) => {
    const checkDaysFilter = (day) => {
        return daysFilter.indexOf(day.name) !== -1
    }
    const minWidth = 25
    const {
        dayWidth,
        name,
        days,
        daysFilter,
        hoursFilter,
        bgColor
    } = props;
    const width = dayWidth * days.length
    const filteredDays = days.filter(checkDaysFilter)
    const style ={
        width: width,
        backgroundColor: bgColor,
        minWidth: 25,
    }
    
    return (
        <div
            style={style}
            name={name} 
            >
            {filteredDays.map((day, index) => {

                return <Day
                        width={dayWidth}
                        key={index} 
                        name={day.name} 
                        date={day.date}
                        hoursFilter={hourFilter}/>
            })}
        </div>
    )
}

export default Month;