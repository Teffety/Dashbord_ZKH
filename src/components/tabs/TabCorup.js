import React from 'react'
import Modal from './form/Modal'
import {connect} from 'react-redux'
import { getCorp } from '../../store/actions.js'

class TabCorup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      isOpenUpdate: null,
      isOpenDelete:null,
      leng: 0,
      value:'Выберите тип документа',
      select:[
        { 
          id:'apg', 
          field:'Антикоррупционное просвещение граждан'
        },
        { 
          id:'npa', 
          field:'Нормативные правовые акты в сфере противодействия коррупции'
        },
        { 
          id:'dkk', 
          field:'Деятельность комиссии по соблюдению требований к служебному поведению и урегулированию конфликта интересов'
        },
      ]
    }
    this.files  = React.createRef();

  }
  componentDidMount(){
     this.props.dispatch(getCorp())
   }
   handleChange(event){
      const value = event.target.value;
      
      this.setState({
        value:value
      })
   }
   handleFile(event){
      this.setState({
        leng :event.target.files.length
      })
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
                        <Modal closeModal={this.closeModal.bind(this)}  onAction={'add'} whereIs={'corup'} file={this.files} select={this.state.value}>
                            <label>
                                <h3>Выберите группу добавления:</h3>
                            <select value={this.state.value} onChange={this.handleChange.bind(this)}>
                              <option disabled  value="Выберите тип документа">Выберите тип документа</option>
                              {
                                this.state.select.map(el => {
                                  return (
                                    <option value={el.field} key={el.id}>{el.field.slice(0,50)}</option>
                                  )
                                })
                              }
                            </select>
                            </label>

                              <input type="file" ref={this.files} onChange={this.handleFile.bind(this)}></input>
                            <input type="submit" disabled={this.state.value === 'Выберите тип документа' || this.state.leng === 0 } value="Добавить файлы"/>
                        </Modal>
                         ) : null
                      }
            <div className="tab_corup-list">
                <table className="tab_corup-table">
                    <thead>
                    <tr className="tab_corup-table-row">
                        <th>Действие</th>
                        <th>Тип документа</th>
                        <th>Документ</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.corup.map( el => {
                          return (
                            <tr className="tab_corup-table-row" key={el.idCor}>
                              <td>
                                <button className="tab_news-remove" title="Удалить" onClick={this.handleRemove.bind(this, el.idCor)}></button>
                                  {
                                    this.state.isOpenDelete === el.idCor ? (
                                      <Modal closeModal={this.closeModal.bind(this)} onAction={'remove'} whereIs={'corup'} onId={el.idCor} delete={true}>
                                        <p> Вы уверены что хотите удалить файл?</p>
                                        <input type="submit" value="Удалить"/>
                                      </Modal>
                                    ) : null
                                  }
                              </td>
                              <td>{el.name}</td>
                              <td>
                                <a href={'https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/corDoc/'+el.file} target="_blank" rel="noopener noreferrer">{el.file.split('.').slice(0,-1).join('')}</a>
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
    corup: state.corup,
  }
}

export default connect(mapStateToProps,null)(TabCorup)