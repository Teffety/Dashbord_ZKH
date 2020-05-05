import React from 'react'
import {connect} from 'react-redux';
import { signIn } from '../store/actions';


class Sign extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            user_name:'',
            user_password:'',
        }
    }
    handler(event){
        event.preventDefault();
        const forma = document.querySelector('.sign_in_form');
        const data = new FormData(forma)
        this.props.dispatch(signIn(data))
    }
    changeValues(event){
        let value = event.target.value.trim('');
        const name =event.target.name;
        this.setState({
            [name]:value
        })

    }
    render(){
        return(
            <div className="sign_in">
                <form className="sign_in_form" onSubmit={this.handler.bind(this)}>
                    <input type="text" value={this.state.user_name} onChange={this.changeValues.bind(this)} name="user_name" placeholder="Логин"/>
                    <input type="password" value={this.state.user_password} onChange={this.changeValues.bind(this)} name="user_password" placeholder="Пароль"/>
                    <input type="submit" disabled={ this.state.user_password.length === 0 || this.state.user_name.length === 0 } value="Зайти"/>
                </form>
            </div>
        )
    }
}


export default connect()(Sign)