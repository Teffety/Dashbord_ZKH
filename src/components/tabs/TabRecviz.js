import React from 'react'
import Modal from './form/Modal'
import { getRec } from '../../store/actions.js'
import {connect} from 'react-redux'

class TabRecviz extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isOpen: false,
          isOpenUpdate: null,
          isOpenDelete:null
        }
      }
      componentDidMount(){
         this.props.dispatch(getRec())
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
            <div className="tab_recviz">
                <button className="tab_news-add" onClick={this.handleClick.bind(this)}> Добавить </button>
                       {
                         this.state.isOpen ? (
                        <Modal closeModal={this.closeModal.bind(this)} onAction={'add'} whereIs={'recviz'}>
                            <div className="tab_recviz-modal">
                              <input type="text" placeholder="Правая колонка" name="firstRec"/>
                              <input type="text" placeholder="Левая колонка" name="secondRec"/>
                            </div>                      
                            <input type="submit" value="Создать строку"/>
                        </Modal>
                         ) : null
                      }
                <div className="tab_recviz-list">
                    <table className="tab_recviz-table">
                        <thead>
                        <tr className="tab_recviz-table-row">
                            <th>Действие</th>
                            <th>Данные правой колонки</th>
                            <th>Данные левой колонки</th>
                        </tr>
                        </thead>
                        <tbody>
                          { 
                            this.props.recviz.map(el=> {
                              return (
                                  <tr className="tab_recviz-table-row" key={el.idR}>
                                  <td>
                                      <button className="tab_news-rebuild" title="Редактировать" onClick={this.handleClickUpdate.bind(this, el.idR)}></button>
                                      <button className="tab_news-remove" title="Удалить" onClick={this.handleRemove.bind(this, el.idR)}></button>
                                      {
                                    this.state.isOpenUpdate === el.idR ? (
                                        <Modal closeModal={this.closeModal.bind(this)} onAction={'update'} whereIs={'recviz'} onId={el.idR}>
                                          <div className="tab_recviz-modal">
                                            <input type="text" placeholder="Правая колонка" name="firstRec" defaultValue={el.firstRec}/>
                                            <input type="text" placeholder="Левая колонка" name="secondRec" defaultValue={el.secondRec}/>
                                          </div>
                                          <input type="submit" value="Редактировать строку"/>
                                        </Modal>
                                    ) : null
                                  }
                                  {
                                    this.state.isOpenDelete === el.idR ? (
                                      <Modal closeModal={this.closeModal.bind(this)} onAction={'remove'} whereIs={'recviz'} onId={el.idR}>
                                        <p> Вы уверены что хотите удалить строку?</p>
                                        <input type="submit" value="Удалить"/>
                                      </Modal>
                                    ) : null
                                  }
                                  </td>
                                  <td>
                                    <span>{el.firstRec}</span>
                                  </td>
                                  <td>
                                    <span>{el.secondRec}</span>
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
    recviz: state.recviz,
  }
}

export default connect(mapStateToProps,null)(TabRecviz)