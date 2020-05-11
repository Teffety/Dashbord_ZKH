import React from 'react';
import { 
    actionAboutInfo,
    addAboutFD,
    removeAboutFD
} from '../../../store/actions.js'
import './../../../style/modal.scss'
import {connect} from 'react-redux'

function ModalAbout (props){

  function  handle(event){
        event.preventDefault();
        const forma = document.querySelector('.modal_form-form');
        const data = new FormData(forma)
        data.append('path', props.whereIs)
        data.append('type', props.type)
        data.append('action', props.onAction)
        if(props.file) data.append('files', props.file.current.files[0])
        if(props.select) data.append('year', props.select)
        if(props.nameAdd) data.append('name', props.nameAdd)
        if(props.onId) data.append('id', props.onId)
        if(props.onAction.split('_')[1] === 'info'){
            props.dispatch(actionAboutInfo(data,props.token))
        }
        else if(props.onAction.split('_')[1] !== 'info'){
            if(props.onAction.split('_')[0] === 'add') props.dispatch(addAboutFD(data, props.token));
            else if (props.onAction.split('_')[0] === 'remove') props.dispatch(removeAboutFD(data, props.token))
        }
        props.closeModal();
        
    }
    function keyHandle(event){
        event.preventDefault() ;
        if(event.key === 'Escape')  props.closeModal();
        else if(event.key === 'Enter') handle(event);
        
    }
        return (
            <div tabIndex={-1} className="modal_form" onKeyUp={keyHandle.bind(this) }>
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

export default  connect( mapStateToProps,null)(ModalAbout)