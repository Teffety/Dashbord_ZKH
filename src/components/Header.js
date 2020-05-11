import React from 'react'
import {  NavLink  } from "react-router-dom";
import '../style/header.scss'
import {signOut} from '../store/actions.js'
import {connect} from 'react-redux';

function Header(props){
    function handleClick(){

      props.dispatch(signOut())
    }
    return(
          <header>
            <div className="header__logo">
              <span>
                Панель управления
              </span>
              <span>
              МУП Сладковское ЖКХ
              </span>
            </div>
            <nav>
              <NavLink to="/news" exact className="link" activeClassName="active-link">
                  Новости
              </NavLink>
              <NavLink to="/contact" className="link" activeClassName="active-link">
                  Контакты
              </NavLink>
              <NavLink to="/about" className="link" activeClassName="active-link">
                  О Нас
              </NavLink>
              <NavLink to="/recviz" className="link" activeClassName="active-link">
                  Реквизиты
              </NavLink>
              <NavLink to="/corup"  className="link"activeClassName="active-link">
                  Коррупция
              </NavLink>
              <NavLink to="/users"  className="link"activeClassName="active-link">
                  Пользователи
              </NavLink>
            </nav>
            <div className="logOut">
                <button onClick={handleClick.bind(this)}>
                  Выйти
                </button>
            </div>
          </header>
    )
  }

  export default connect()(Header)