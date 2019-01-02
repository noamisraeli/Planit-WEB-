import {
    WORKSPACE_LOADED, 
    WORKSPACE_UNLOADED,
    ASYNC_START,
    OPEN_MODAL,
    CLOSE_MODAL,
    SCROLL_CHANGED,
    RESOLUTION_CHANGED,
    SPLITTER_DRAG_END,
    SPLITTER_DRAG_START,
    SPLITTER_DRAG,
    SPLITTER_DOUBLE_CLICKED,
    WORKSPACE_MOUNTED,
    QUEUE_FILTER_NAME_CHANGE,
    GO_TO_FIRST_JOB,
    GO_TO_LAST_JOB,
    JOB_SELECT,
    JOB_DRAG_START,
    ELEMENT_DRAG_OVER,
    ELEMENT_DRAG_END

    
} from '../constants/actionTypes';
import { JOB } from '../constants/configurations/commonConfiguration';


export default (state={}, action) =>{
    switch(action.type){
        case WORKSPACE_UNLOADED:
            return {}
        case WORKSPACE_LOADED:
            return {
                startTime: action.payload[0].startTime,
                endTime: action.payload[0].endTime,
                views: action.payload[0].views,
                splitter: {
                    isDragged: false
                },
                modal: {
                    isOpen: false
                },
                draggedComponent: action.payload[0].draggedComponent}
        case WORKSPACE_MOUNTED:
            return {
                ...state,
                ...action.payload
            }
        case JOB_SELECT:
            return {
                ...state,
                views: state.views.map(view => {
                    if (view.id === action.payload.viewId){
                        if (action.payload.withCtrlKey){
                            if (view.selectedJobs.includes(action.payload.jobId)){
                                view.selectedJobs = view.selectedJobs.filter(jobId => {return jobId !== action.payload.jobId})
                            }
                            else {
                                view.selectedJobs = view.selectedJobs.concat(action.payload.jobId)
                            }
                        }
                        else {
                            if(view.selectedJobs.includes(action.payload.jobId)){
                                view.selectedJobs = []
                            }
                            else {
                                view.selectedJobs = [action.payload.jobId]
                            }
                        }
                    }
                    return view 
                })
            }
        case OPEN_MODAL:
            return {
                ...state,
                modal:{
                    isOpen: true,
                    content: action.payload.content,
                    type: action.payload.type,
                    id:action.payload.id,
                    title: action.payload.title
                }
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modal:{
                    isOpen: false
                }
            }
        case QUEUE_FILTER_NAME_CHANGE:
            return {
                ...state,
                views: state.views.map(view => {
                    if(view.id === action.payload.viewId){
                        view.filters.freeTextFilter = action.payload.newValue
                    }
                    return view
                })
            }
        case SCROLL_CHANGED:
            return {
                views: state.views.map((view) => {
                    if (view.id === action.payload.viewId){
                        view.startTimeView = action.payload.newState
                    }
                    return view
                }
                ),
                ...state
            }
        case RESOLUTION_CHANGED:
            return {
                    views: state.views.map(view => {
                        if (view.id === action.payload.viewId){
                            view.sizes.hourAsPixel =  view.sizes.hourAsPixel - action.payload.diff
                        }
                        return view
                    }),
                ...state
            }
        case SPLITTER_DRAG_START:
            return {
                ...state,
                splitter: {
                    isDragged: true,
                    startPosition: action.payload.startPosition,
                    firstWidth: action.payload.firstViewWidth,
                    secondWidth: action.payload.secondViewWidth,
                    firstIndex: action.payload.firstIndex,
                    secondIndex: action.payload.secondIndex, 
                }
            }
        case SPLITTER_DRAG:
            return {
                ...state, 
                views: state.views.map((view, index) => {
                    if(index === action.payload.firstIndex){
                        view.sizes.widthPercent = action.payload.firstNewWidth
                    }
                    if(index === action.payload.secondIndex){
                        view.sizes.widthPercent = action.payload.secondNewWidth
                    }
                    return view
                })
            }
        case SPLITTER_DRAG_END:
            return {
                ...state,
                splitter : {
                    isDragged: false
                }
            }
        case SPLITTER_DOUBLE_CLICKED:
            return {
                ...state,
                views : state.views.map((view,index) => {
                    if(index !== action.payload.secondIndex){
                        view.sizes.width = 0
                    }
                    return view

                })
                
            }
        case GO_TO_FIRST_JOB:
            return {
                ...state, 
                views: state.views.map((view) => {
                    if(view.id === action.payload.viewId){
                        view.startTimeView = action.payload.firstJob.startTime
                    }
                    return view
                })
            }
        case GO_TO_LAST_JOB: 
            return {
                ...state,
                views: state.views.map((view) => {
                    if(view.id === action.payload.viewId){
                        view.startTimeView = action.payload.lastJob.startTime
                    }
                    return view
                })
            }
        case ELEMENT_DRAG_OVER:
            return {
                ...state,
                draggedComponent: {
                    ...state.draggedComponent,
                    style:{
                        ...state.draggedComponent.style,
                        ...action.payload
                    }
                }
            }
        case JOB_DRAG_START:
            return {
                ...state,
                draggedComponent : {
                            compType: JOB,
                            isDragged: true,
                            viewId: action.payload.viewId,
                            id: action.payload.jobId,
                            style: action.payload.style
                }
            }
        case ELEMENT_DRAG_END:
            return {
                ...state,
                draggedComponent :{
                    compType: JOB,
                    isDragged: false
                }
            }
        case ASYNC_START:
            return {
              ...state,
              inProgress: true
            };
        default:
            return state
    }
} 