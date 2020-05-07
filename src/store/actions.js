import {
    NEWS,
    CONTACT,
    ABOUT,
    RECVIZ,
    CORUPTION,
    TOKEN
} from './type.js'
import Axios from 'axios';


export function signIn( data ){
 return dispatch => {
    Axios.post('https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/', data)
    .then(res=> {
        const token = res.data.token;
        dispatch({
            type:TOKEN,
            payload:token
        })
    })
 }
}


export const  getNews = () => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/news/")
        const json = await response.data
        dispatch({
            type:NEWS,
            payload:json.reverse()
           })
    }
};
export const  getContact = ( data = null) => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/contact/")
        const json = await response.data
        dispatch({
            type:CONTACT,
            payload:json.reverse()
           })
    }
};
export const  getAbout = ( data = null) => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/about/")
        const json = await response.data
        dispatch({
            type:ABOUT,
            payload:json.reverse()
           })
    }
};
export const  getRec = ( data = null) => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/recviz/")
        const json = await response.data
        dispatch({
            type:RECVIZ,
            payload:json.reverse()
           })
    }
};
export const  getCorp = ( data = null) => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/corup/")
        const json = await response.data
        dispatch({
            type:CORUPTION,
            payload:json.reverse()
           })
    }
};
export const  actionObject = ( data = null, token = null) => {
    return async dispatch => {
        const response = await Axios.post(`https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/${data.get('path')}/`, data,{
            headers:{
                'Autorization' : token
            },
        })
        const res = await response.data;

        // dispatch({ type: data.get('path').toUpperCase(),
        //             payload: res
        //         });
    }
};