import React from 'react'
import './Timeline.css'
import Hour from './Hour';

class Timeline extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            finishedLoading: false
        }
        
    }

    loadTimeline = () => {
        let minutes = new Array();
        let hours = new Array();
        let days = new Array();
        let months = new Array();
        let years = new Array();
        let {initialDate, lastDate} = this.props;
        while(initialDate <= lastDate){
            this.addHour(hours, initialDate)
            this.addDay(days, initialDate);
            this.addMonth(months, initialDate);
            this.addYear(years, initialDate);
            this.nextDate(initialDate, "hour");
        }
        this.setState({
                hours: hours,
                days: days,
                months: months,
                years: years,
                finishedLoading: true
            })
    }
    
    static defaultProps = {
        initialTimeUnits: ["hours", "days"],
        monthNames:["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ],
        dayNames : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        showDaysInWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        initialDate: new Date(2018, 5, 1),
        lastDate: new Date(2018, 5, 15)
    }

    isLastItem = (list, item) => {
        if (list.length <= 0){
            return false
        }
        const lastObj = list[list.length - 1]
        if (JSON.stringify(lastObj) === JSON.stringify(item)){
            return true
        }
        
    }

    addHour = (listOfHours, date) => {
        const newHour = {
            hourNumber: date.getHours() >= 10 ? date.getHours().toString() : "0"  + date.getHours().toString(),
            numberOfChilds: 60
        }
        if(!this.isLastItem(listOfHours, newHour)){
            listOfHours.push(newHour)
        }
    }

    addDay = (listOfDays, date) => {
        const dayNames = this.props.dayNames;
        const newDay = {
            dayInWeek: dayNames[date.getDay()],
            dayInMonth: date.getDate(),
            numberOfChilds: 24
        }
        if (!this.isLastItem(listOfDays, newDay)){
            listOfDays.push(newDay);
        }
    }

    addMonth = (listOfMonths, date) => {
        const monthNames = this.props.monthNames;
        const newMonth = {
            numberOfChilds : this.getDaysInMonth(
                date.getMonth(),
                date.getFullYear()
                ),
            monthName: monthNames[date.getMonth()],
            monthNumber: date.getMonth() + 1
            }
        if (!this.isLastItem(listOfMonths, newMonth)){
            listOfMonths.push(newMonth)
        }
    }

    addYear = (listOfYears, date) => {
        const newYear = {
            yearName: "",
            yearNumber: date.getFullYear(),
            numberOfChilds: 12
        }
        if(!this.isLastItem(listOfYears, newYear)){
            listOfYears.push(newYear)
        }
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    }

    nextDate = (date, timeType) => {
        switch(timeType){
            case timeType === "hour":
                date.setHours(date.getHours() + 1)
            case timeType === "month":
                date.setMonth(date.getMonth() + 1)
            case timeType ==="year":
                date.setYear(date.getFullYear() + 1)
            default:
                date.setHours(date.getHours() + 1)
       }
    }

    componentDidMount(){
        this.loadTimeline();
    }

    renderHours = (hours) => {
        return (
            <tr id="hours">
                    {hours.map((hour, index) => {
                        return (
                            <td 
                                key={index}
                                style={{
                                    minWidth: 25,

                                }}
                            >
                                {hour.hourNumber}
                            </td>
                        )
                    })}
                    </tr>
        )
    }
    renderDays = (days) => {
        return (
            <tr>
                {days.map((day, index) => {
                    return (
                        <td key={index} colSpan={day.numberOfChilds}>
                            {day.dayInWeek}
                        </td>
                    )
                })}
            </tr>
                    
        )
    }

    renderMonths = (months) => {

        return (
            <tr>
                {months.map((month, index) => {
                    return (
                        <td key={index} colSpan={
                            month.numberOfChilds * 24
                        }>
                        {month.monthName}
                        </td>
                    )
                })}
            </tr>
        )
    }


    render(){
        const {hours, days, months, years} = this.state;
        
        const timesUnits = {
            hours: [this.renderHours, hours],
            days: [this.renderDays, days],
            months: [this.renderMonths, months ]
        }
        if (!this.state.finishedLoading){
           
            return "In Progress..."
        }
        return (
            <div>
                <Hour/>
            </div> 
        )
    }
}

export default Timeline