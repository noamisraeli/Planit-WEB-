import {GANTT_VIEW} from '../../constants/viewTypes'
import { GO_TO_LAST_JOB, GO_TO_FIRST_JOB } from '../../constants/actionTypes';

const jobs = [
    
    {
        id : 1,
        dependencies: {
            jobQueue: 1,
            jobType: "print",
            nextJob: 2,

        },
        additionalParams: {
            description: "JOBJOB",
            quantity: 213,
            order: 123,
            orderColor: "lightblue",
            bgColor: null
        },
        startTime: new Date(2018, 10, 28, 3),
        endTime: new Date(2018, 10, 28, 4, 30)
    },
    {
        id : 2,
        dependencies: {
            jobQueue: 2,
            jobType: "print",
            nextJob: 3 
        },
        additionalParams: {
            description: "JOBJOB",
            quantity: 213,
            order: 123,
            orderColor: "lightblue",
            bgColor: null
        },
        startTime: new Date(2018, 10, 28, 5),
        endTime: new Date(2018, 10, 28, 5, 30)
    },
    {
        id : 3,
        dependencies: {
            jobQueue: 1,
            jobType: "print",
            nextJob: 4
        },
        additionalParams: {
            description: "JOBJOB",
            quantity: 213,
            order: 123,
            orderColor: "red",
            bgColor: null
        },
        startTime: new Date(2018, 10, 28, 6),
        endTime: new Date(2018, 10, 28, 7)
    },
    {
        id : 4,
        dependencies: {
            jobQueue: 1,
            jobType: "print",
            nextJob: 5 
        },
        additionalParams: {
            description: "JOBJOB",
            quantity: 213,
            order: 123,
            orderColor: "red",
            bgColor: null
        },
        startTime: new Date(2018, 10, 28, 8),
        endTime: new Date(2018, 10, 28, 10)
    }
]

const queues = [
    {
        id: 1,
        style: {
            color: "gray",
            backgroundColor: "lightgray"
        },
        jobTypesAllowed: ["Print"],
        numberOfParallelJobs: 1,
        isExists: true,
        additionalParams: {
            title: "Printer 1",
            description: "QUEUEUE sadf sadf asdf",
        },

    },
    {
        id: 2,
        style: {
            color: "red",
            backgroundColor: "orange"
        },
        jobTypesAllowed: ["Pack"],
        numberOfParallelJobs: 1,
        additionalParams: {
            title: "Packer 1",
            description: "QUEUEUEa asdf asdf ",
        },
    }
]

const viewState = {
    numberOfColums: 1,
    numberOfRows: 1,
    startTime: new Date(2018, 10, 27, 23),
    endTime: new Date(2018, 10, 28, 15),
    viewKeys: ["view1", "view2"],
    modal: {
        isOpen: false,
        content: {}
    },
    splitter: {
        isClicked: false,
        
    },
    views: [
        {
            id: 1,
            type: GANTT_VIEW,
            startTimeView: new Date(2018, 10, 28, 1),
            selectedJobs: [],
            sizes: {
                widthPercent: 47,
                height: "100%",
                minWidth: 100,
                minHeight: 100,
                hourAsPixel: 100,
                dayInPixel: 960
            },
            filters: {
                queueTypeFilter: ["Printer"],
                freeTextFilter: "",
                jobFilter: {
                    orderId: 13
                }
            },
    
        },
        
        {
            id: 2,
            type: GANTT_VIEW,
            startTimeView: new Date(2018, 10, 28, 1),
            selectedJobs: [],
            sizes: {
                widthPercent: 50,
                height: "100%",
                minWidth: 100,
                minHeight: 100,
                jobHeight: 30,
                hourAsPixel: 100,
                dayInPixel: 960
            },
            filters: {
                queueTypeFilter: ["Printer"],
                freeTextFilter: "",
                jobFilter: {
                    orderId: 13
                }
            },
            operators: [
                {
                    type: "icon",
                    name:"fast_forward", 
                    position:"right", 
                    title:"Go to last job",
                    action: GO_TO_LAST_JOB
                },
                {
                    type: "icon",
                    name:"fast_rewind", 
                    position:"right", 
                    title:"Go to first job", 
                    action: GO_TO_FIRST_JOB
                }
            ]
    
        }

]}
export {queues, jobs, viewState}