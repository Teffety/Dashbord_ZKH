import React from 'react';
import {connect} from 'react-redux'
import '../../style/tab_news.scss'
import Modal from './form/Modal'
import { getNews } from '../../store/actions.js'



class TabMain extends React.Component{
        constructor(props){
          super(props);
          this.state = {
            isOpen: false
          }         
        }
        componentDidMount(){
         this.props.dispatch(getNews())
        }
        handleClick(){
          this.setState({
            isOpen: !this.state.isOpen
          })
        }
        closeModal(){
          this.setState({
            isOpen: !this.state.isOpen
          })
        }
        render(){
          return (
            <div className="tab_news">
              <div className="tab_news-toolbar">
                  <div className="tab_news-search">
                    <input placeholder="Найти новости..." className="tab_news-searchInput"/>
                    <button className="tab_news-searchBtn"></button>
                  </div>
                  <button className="tab_news-add" onClick={this.handleClick.bind(this)}> Добавить </button>
                       {
                         this.state.isOpen ? (
                        <Modal closeModal={this.closeModal.bind(this)} onAction={'add'} whereIs={'news'}>
                            <input type="text" placeholder="Заголовок новости" name="nameNews"/>
                            <textarea placeholder="Текст новости" name="news"/>
                            {/* <input type="text" placeholder="Автор новости"/> */}
                            <input type="submit" value="Создать новость"/>
                        </Modal>
                         ) : null
                      }
              </div>
            <div className="tab_news-news">
              {
                this.props.news.map(el => {
                  return (
                    <div className="tab_news-card" key={el.id}>
                      <h4 className="tab_news-header">{el.nameNews}</h4>
                      <span className="tab_news-text">{el.news}</span>
                       <div className="tab_news-cardbar">
                        <div className="tab_news-info">
                          {/* <span className="tab_news-autor">{el.author}</span> */}
                          <span className="tab_news-data">{el.timeD}</span>
                         </div>
                         <div className="tab_news-actions">
                           <button className="tab_news-rebuild" title="Редактировать" ></button>
                           <button className="tab_news-remove" title="Удалить"></button>
                         </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            </div>
        )
        }
}

const mapStateToProps = state => {
  return {
    news: state.news,
  }
}

export default connect(mapStateToProps,null)(TabMain)