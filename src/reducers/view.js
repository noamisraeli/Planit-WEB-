import {
    WORKSPACE_LOADED, 
    WORKSPACE_UNLOADED,
    ASYNC_START,
    JOB_DRAG_START,
    JOB_DROP,
    GANTT_VIEW_LOADED,
    GANTT_VIEW_UNLOADED,
    SCROLL_CHANGED
    
} from '../constants/actionTypes';

const 

export default (state={}, action) =>{
    switch(action.type){
        case ASYNC_START:
            return {
              ...state,
              inProgress: true
            };
        case SCROLL_CHANGED:
            const {newState, viewIndex} = action.payload;
            return {
                ...state,
                ...state.viewState.view[viewIndex].startTimeView = newState
                

            }
        case JOB_DRAG_START:
            return {
                ...state,
                draggedJob: action.payload
            }
        case JOB_DROP:
            console.log(state)
            if (action.payload.resourceId === state.draggedJob.resourceId){
                alert("didnt do anything")
            }
            return {
                ...state
                        }
        default:
            return state
    }
}