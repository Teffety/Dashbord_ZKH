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
import Axios from 'axios';

let timer;
function counter (){
    let index = 0;
  
    return function() {
        return index++
    }; 
  }
  let index = counter()


export function signIn( data ){
   
 return dispatch => {
        type:TOKEN,
        payload:'token'
    })
 }
}
export function signOut (){
    return dispatch => {
        dispatch({
            type:TOKEN,
            payload:null
        })
    }
}


export const  getNews = () => {
    return async dispatch => {
        dispatch({
            type:NEWS,
            payload:[]
           })
    }
};
export const  getContact = () => {
    return async dispatch => {
        dispatch({
            type:CONTACT,
            payload:[]
           })
    }
};
export const  getAboutInfo = () => {
    return async dispatch => {
        dispatch({
            type:ABOUTINFO,
            payload:[]
           })
    }
};
export const  getAboutDoc = () => {
    return async dispatch => {
        dispatch({
            type:ABOUTDOC,
            payload:[]
           })
    }
};
export const  getAboutImg = () => {
    return async dispatch => {
        dispatch({
            type:ABOUTIMG,
            payload:[]
           })
    }
};
export const  getRec = () => {
    return async dispatch => {
        dispatch({
            type:RECVIZ,
            payload:[]
           })
    }
};
export const  getCorp = () => {
    return async dispatch => {
        dispatch({
            type:CORUP,
            payload:[]
           })
    }
};
export const  actionObject = ( data = null, token = null) => {
    return async dispatch => {
        dispatch({ type: data.get('path').toUpperCase(),
                    payload: data
                });
    }
};
export const  removeObject = ( data = null, token = null) => {
    return async dispatch => {
        dispatch({ type: data.get('path').toUpperCase(),
                    payload: data
                });
    }
};
export const actionAboutInfo = ( data = null, token=null) => {
    return async dispatch => {
        dispatch({ type: ABOUTINFO,
                    payload: []
                });
    }
}
export const addAboutFD = ( data = null, token=null) => {
        return async dispatch => {
        dispatch({ type: [data.get('path'),data.get('type')].join('').toUpperCase(),
                    payload: []
                });
    }
}
export const removeAboutFD = ( data = null, token=null) => {
        return async dispatch => {
        dispatch({ type: [data.get('path'),data.get('type')].join('').toUpperCase(),
                    payload: []
                });
    }
}
