import React from 'react'
import {  NavLink  } from "react-router-dom";
import '../style/header.scss'
  export default function Header(props){

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
              <NavLink to="/" exact className="link" activeClassName="active-link">
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
                  Корупция
              </NavLink>
            </nav>
            <div className="logOut">
                <button>
                  Сохранить и Выйти
                </button>
            </div>
          </header>
    )
  }