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
    Axios.post('https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/', data)
    .then(res=> {
        if(timer) clearTimeout(timer)

        const token = res.data.token;
        dispatch({
            type:TOKEN,
            payload:token
        })
    }).catch(() => {
        if(timer) {
            clearTimeout(timer)
        }
        dispatch({
            type:ERROR,
            payload:{
                count:index(),
                message:'Ошибка авторизации'
            }
        })
        timer =  setTimeout( () => {
            index = counter();
            dispatch({
                type:ERROR,
                payload:null
            })
        
        },2000)
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
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/news/")
        const json = await response.data
        dispatch({
            type:NEWS,
            payload:json.reverse()
           })
    }
};
export const  getContact = () => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/contact/")
        const json = await response.data
        dispatch({
            type:CONTACT,
            payload:json.reverse()
           })
    }
};
export const  getAboutInfo = () => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/about/")
        const json = await response.data
        dispatch({
            type:ABOUTINFO,
            payload:json
           })
    }
};
export const  getAboutDoc = () => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/about/doc/")
        const json = await response.data
        dispatch({
            type:ABOUTDOC,
            payload:json
           })
    }
};
export const  getAboutImg = () => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/about/img/")
        const json = await response.data
        dispatch({
            type:ABOUTIMG,
            payload:json
           })
    }
};
export const  getRec = () => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/recviz/")
        const json = await response.data
        dispatch({
            type:RECVIZ,
            payload:json.reverse()
           })
    }
};
export const  getCorp = () => {
    return async dispatch => {
        const response = await Axios.get("https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/corup/")
        const json = await response.data
        dispatch({
            type:CORUP,
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
        dispatch({ type: data.get('path').toUpperCase(),
                    payload: res.reverse()
                });
    }
};
export const  removeObject = ( data = null, token = null) => {
    return async dispatch => {
        const response = await Axios.put(`https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/${data.get('path')}/`, data,{
            headers:{
                'Autorization' : token
            },
        })
        const res = await response.data;
        dispatch({ type: data.get('path').toUpperCase(),
                    payload: res.reverse()
                });
    }
};
export const actionAboutInfo = ( data = null, token=null) => {
    return async dispatch => {
        const response = await Axios.post(`https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/${data.get('path')}/`, data,{
            headers:{
                'Autorization' : token
            },
        })
        const res = await response.data;
        dispatch({ type: ABOUTINFO,
                    payload: res
                });
    }
}
export const addAboutFD = ( data = null, token=null) => {
        return async dispatch => {
        const response = await Axios.post(`https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/${data.get('path')}/${data.get('type')}/`, data,{
            headers:{
                'Autorization' : token
            },
        })
        const res = await response.data;
        dispatch({ type: [data.get('path'),data.get('type')].join('').toUpperCase(),
                    payload: res
                });
    }
}
export const removeAboutFD = ( data = null, token=null) => {
        return async dispatch => {
        const response = await Axios.put(`https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/api/${data.get('path')}/${data.get('type')}/`, data,{
            headers:{
                'Autorization' : token
            },
        })
        const res = await response.data;
        dispatch({ type: [data.get('path'),data.get('type')].join('').toUpperCase(),
                    payload: res
                });
    }
}