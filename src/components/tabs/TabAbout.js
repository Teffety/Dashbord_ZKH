import React from 'react'
import Modal from './form/Modal'


export default class TabAbout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isOpen: false
        }
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
            <div className="tab_about">
                <button className="tab_news-add" onClick={this.handleClick.bind(this)}> Добавить </button>
                       {
                         this.state.isOpen ? (
                        <Modal closeModal={this.closeModal.bind(this)}>
                          asasas
                        </Modal>
                         ) : null
                      }
                <div className="tab_about-list">
                    <table className="tab_about-table">
                        <thead>
                        <tr className="tab_about-table-row">
                            <th>Действие</th>
                            <th>Данные</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="tab_about-table-row">
                            <td>
                                <button className="tab_news-rebuild" title="Редактировать"></button>
                                <button className="tab_news-remove" title="Удалить"></button>
                            </td>
                            <td>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}