import {
    DATABASE_LOADED,
    DATABASE_UNLOADED
    
} from '../constants/actionTypes';

export default (state={}, action) =>{
    switch(action.type){
        case DATABASE_LOADED:
            return {
                jobs: action.payload[0],
                queues: action.payload[1]
            }
        case DATABASE_UNLOADED:
            return {

            }
        default:
            return state
    }
}