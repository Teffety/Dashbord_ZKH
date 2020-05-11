import React from 'react'
import Modal from './form/Modal'
import { getContact } from '../../store/actions.js'
import {connect} from 'react-redux'

class TabContact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isOpen: false,
          isOpenUpdate: null,
          isOpenDelete:null
        }
      }
      componentDidMount(){
         this.props.dispatch(getContact())
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
            <div className="tab_contact">
                <button className="tab_news-add" onClick={this.handleClick.bind(this)}> Добавить </button>
                       {
                         this.state.isOpen ? (
                        <Modal closeModal={this.closeModal.bind(this)} onAction={'add'} whereIs={'contact'}>
                            <textarea placeholder="Текст новости" name="text" rows="10"/>
                            {/* <input type="text" placeholder="Автор новости"/> */}
                            <input type="submit" value="Создать поле"/>
                        </Modal>
                         ) : null
                      }
                <div className="tab_contact-list">
                    <table className="tab_contact-table">
                        <thead>
                        <tr className="tab_contact-table-row">
                            <th>Действие</th>
                            <th>Данные</th>
                        </tr>
                        </thead>
                        <tbody>
                          { 
                            this.props.contact.map(el=> {
                              return (
                                  <tr className="tab_contact-table-row" key={el.idC}>
                                  <td>
                                      <button className="tab_news-rebuild" title="Редактировать" onClick={this.handleClickUpdate.bind(this, el.idC)}></button>
                                      <button className="tab_news-remove" title="Удалить" onClick={this.handleRemove.bind(this, el.idC)}></button>
                                      {
                                    this.state.isOpenUpdate === el.idC ? (
                                        <Modal closeModal={this.closeModal.bind(this)} onAction={'update'} whereIs={'contact'} onId={el.idC}>
                                          <textarea placeholder="Текст новости" name="text" rows="10" defaultValue={el.firstCont}/>

                                          <input type="submit" value="Редактировать поле"/>
                                        </Modal>
                                    ) : null
                                  }
                                  {
                                    this.state.isOpenDelete === el.idC ? (
                                      <Modal closeModal={this.closeModal.bind(this)} onAction={'remove'} whereIs={'contact'} onId={el.idC}>
                                        <p> Вы уверены что хотите удалить поле?</p>
                                        <input type="submit" value="Удалить"/>
                                      </Modal>
                                    ) : null
                                  }

                                  </td>
                                  <td>
                                    <span>{el.firstCont}</span>
                                  </td>
                                  </tr>
                              )
                            })
                          }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
  return {
    contact: state.contact,
  }
}

export default connect(mapStateToProps,null)(TabContact)