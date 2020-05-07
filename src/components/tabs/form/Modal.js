import React from 'react';
import { 
    actionObject
} from '../../../store/actions.js'
import './../../../style/modal.scss'
import {connect} from 'react-redux'

function Modal (props){

  function  handle(event){
        event.preventDefault();
        const forma = document.querySelector('.modal_form-form');
        const data = new FormData(forma)
        data.append('path', props.whereIs)
        data.append('action', props.onAction)
        if(props.onAction){
            props.dispatch(actionObject(data, props.token));
        }
        props.closeModal();
        
    }
    function keyHandle(event){
        event.preventDefault() ;
        if(event.key === 'Escape')  props.closeModal();
        else if(event.key === 'Enter') handle(event);
        
    }
        return (
            <div tabIndex={0} className="modal_form" onKeyUp={keyHandle.bind(this) }>
                <button className="modal_form-close" onClick={props.closeModal}>Закрыть</button>
                <form className="modal_form-form" onSubmit={handle.bind(this)}>
                    {props.children}
                </form>
            </div>
        )
}

const mapStateToProps = state => {
    return {
        token:state.token       
    }
}

export default  connect( mapStateToProps)(Modal)