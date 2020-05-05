import {
    NEWS,
    CONTACT,
    ABOUT,
    RECVIZ,
    CORUPTION,
    TOKEN,
} from './type.js'

const initialState = {
    news:[],
    about:{},
    contact:{},
    recviz:{},
    corup:{},
    token:null
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case NEWS:
            return {...state, news:action.payload }
        case CONTACT:
            return {...state, contact:action.payload }
        case ABOUT:
             return {...state, about:action.payload }
        case RECVIZ:
             return {...state, recviz:action.payload }
        case CORUPTION:
             return {...state, corup:action.payload }
        case TOKEN:
            return {...state, token:action.payload}
        default: return  state
    }
    
}