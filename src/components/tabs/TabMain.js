import React from 'react';
import {connect} from 'react-redux'
import '../../style/tab_news.scss'
import Modal from './form/Modal'
import { getNews } from '../../store/actions.js'



class TabMain extends React.Component{
        constructor(props){
          super(props);
          this.state = {
            isOpen: false,
            isOpenUpdate: null,
            isOpenDelete:null,
            search:'',
            value:'props',
            news:null
          } 
        }
        componentDidMount(){
         this.props.dispatch(getNews())
        }
        searchChange(event){
          const value = event.target.value
          const array = this.props.news.filter(el=> el.nameNews.toUpperCase().trim().indexOf(value.toUpperCase().trim()) > -1)
          
          this.setState({
            news:array,
            search: value,
            value:'state'
          })
        }
        searchClick(){

        }
        handleClick(){
          this.setState({
            isOpen:true
          })
        }
        handleClickUpdate(elem, event){
          this.setState({ 
            isOpenUpdate: elem
          })
        }
        handleRemove(elem, event){
          this.setState({
            isOpenDelete:elem
          })
        }
        closeModal(){
          this.setState({
            isOpen: false,
            isOpenUpdate: null,
            isOpenDelete:null
          })
        }
        render(){
          return (
            <div className="tab_news">
              <div className="tab_news-toolbar">
                  <div className="tab_news-search">
                    <input placeholder="Найти новости..." className="tab_news-searchInput"
                      value={this.state.search} onChange={this.searchChange.bind(this)}/>
                    <button className="tab_news-searchBtn" onClick={this.searchClick.bind(this)}></button>
                  </div>
                  <button className="tab_news-add" onClick={this.handleClick.bind(this)}> Добавить </button>
                       {
                         this.state.isOpen ? (
                        <Modal closeModal={this.closeModal.bind(this)} onAction={'add'} whereIs={'news'}>
                            <input type="text" placeholder="Заголовок новости" name="nameNews"/>
                            <textarea placeholder="Текст новости" name="news" rows="10"/>
                            {/* <input type="text" placeholder="Автор новости"/> */}
                            <input type="submit" value="Создать новость"/>
                        </Modal>
                         ) : null
                      }
              </div>
            <div className="tab_news-news">
              {
                this[this.state.value].news.map(el => {
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
                           <button className="tab_news-rebuild" title="Редактировать" onClick={this.handleClickUpdate.bind(this, el.id)}></button>
                           <button className="tab_news-remove" title="Удалить" onClick={this.handleRemove.bind(this, el.id)}></button>
                         </div>
                      </div>
                      {
                         this.state.isOpenUpdate === el.id ? (
                        <Modal closeModal={this.closeModal.bind(this)} onAction={'update'} whereIs={'news'} onId={el.id}>
                            <input type="text" placeholder="Заголовок новости" name="nameNews" defaultValue={el.nameNews}/>
                            <textarea placeholder="Текст новости" name="news" rows="10" defaultValue={el.news}/>
                            {/* <input type="text" placeholder="Автор новости"/> */}
                            <input type="submit" value="Редактировать новость"/>
                        </Modal>
                         ) : null
                      }
                      {
                         this.state.isOpenDelete === el.id ? (
                        <Modal closeModal={this.closeModal.bind(this)} onAction={'remove'} whereIs={'news'} onId={el.id}>
                            <p>
                              Вы уверены что хотите удалить новость?
                            </p>
                            {/* <input type="text" placeholder="Автор новости"/> */}
                            <input type="submit" value="Удалить новость"/>
                        </Modal>
                         ) : null
                      }
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