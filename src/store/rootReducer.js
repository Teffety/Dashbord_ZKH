import {
    NEWS,
    CONTACT,
    ABOUTINFO,
    ABOUTDOC,
    ABOUTIMG,
    RECVIZ,
    CORUP,
    TOKEN,
    ERROR
} from './type.js'

const initialState = {
    news:[],
    aboutInfo:[],
    aboutDoc:[],
    aboutImg:[],
    contact:[],
    recviz:[],
    corup:[],
    error:null,
    token:null
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case NEWS:
            return {...state, news:action.payload }
        case CONTACT:
            return {...state, contact:action.payload }
        case ABOUTINFO:
             return {...state, aboutInfo:action.payload }
        case ABOUTDOC:
            return {...state, aboutDoc:action.payload }
        case ABOUTIMG:
            return {...state, aboutImg:action.payload }
        case RECVIZ:
             return {...state, recviz:action.payload }
        case CORUP:
             return {...state, corup:action.payload }
        case TOKEN:
            return {...state, token:action.payload}
        case ERROR:
             return {...state, error:action.payload}
        default: return  state
    }
    
}