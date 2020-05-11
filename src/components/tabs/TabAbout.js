import React from 'react'
import Modal from './form/ModalAbout'
import { 
  getAboutInfo,
  getAboutDoc,
  getAboutImg
 } from '../../store/actions.js'
import {connect} from 'react-redux'
import '../../style/tab_about.scss'

class TabAbout extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      isOpenUpdate: null,
      isOpenDelete:null,
      value:'Выберите год',
      foto:1,
      leng: 0,
      document:2,
      tabs:'one',
      imgLoad:{
        load:null,
        src:null,
        alt:null
      },
      tabsName:[
        {
          name:'Информация',
          id:'one'
        },
        {
          name:'Документы',
          id:'two'
        },
        {
          name:'Фотографии',
          id:'three'
        },
      ]
    }
    this.files  = React.createRef();
    this.selections = [];
    this.active = 'active_tab';
  }
      componentDidMount(){
        this.props.dispatch(getAboutInfo())
        this.props.dispatch(getAboutDoc())
        this.props.dispatch(getAboutImg())
        this.selections = this.getArrDate()
      }
      getArrDate(){
        let y = new Date().getFullYear();
        const startYear = '2018'
        const arr = [];
        function a(){
          if(y > startYear){
             arr.push(y);
              y = y - 1
              a()
          }else if(parseInt(y) === parseInt(startYear)) arr.push(y)
        }
        a()
        return arr
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
      handleImg(event){
        const reader = new FileReader();
        const file = event.target.files
        reader.addEventListener('load', e => {
          this.setState({
            leng :file.length,
            imgLoad:{
              load:true,
              alt:file[0].name,
              src:e.target.result
            }
          })
        })
        reader.readAsDataURL(file[0]);
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
          isOpenDelete:null,
          leng:0,
          imgLoad:{
            load:false,
            alt:null,
            src:null
          },
          value:'Выберите год'
        })
      }
      changeTab(id, event){
        event.preventDefault();
        this.setState({
          tabs:id
        })
      }
      render(){
        return (
            <div className="tab_about">
                      <div className="tab_about-header">
                          {
                            this.state.tabsName.map(({id, name}) => {
                                 return (
                                <div className={'tab_about-header_link ' + (id === this.state.tabs  ? this.active : '') } key={id} onClick={this.changeTab.bind(this, id)}>
                                    <span className="tab_about-header_span">{name}</span>
                                </div>
                              )
                            })
                          }
                          <span className="tab_about-header_line"></span>
                      </div>
                <div className="tab_about-list">
                {
                  this.state.tabs === this.state.tabsName[0].id && (
                  <section>
                    <div className="tab_about-toolbar">
                      <h3>Панель Информация</h3>
                      <button className="tab_news-add" onClick={this.handleClick.bind(this)}> Добавить </button>
                    </div>
                       {
                         this.state.isOpen ? (
                        <Modal closeModal={this.closeModal.bind(this)} onAction={'add_info'}  whereIs={'about'}>
                            <textarea placeholder="Текст" name="firstText" rows="10"/>
                            {/* <input type="text" placeholder="Автор новости"/> */}
                            <input type="submit" value="Создать поле"/>
                        </Modal>
                         ) : null
                      }

                      <table className="tab_about-table">
                        <thead>
                        <tr className="tab_about-table-row">
                            <th>Действие</th>
                            <th>Данные</th>
                        </tr>
                        </thead>
                        <tbody>

                        { 
                      this.props.aboutInfo.map(({firstText, idA }) => {
                        return (
                          <tr className="tab_about-table-row" key={idA}>
                          <td>
                            <button className="tab_news-rebuild" title="Редактировать" onClick={this.handleClickUpdate.bind(this, idA)}></button>
                            <button className="tab_news-remove" title="Удалить" onClick={this.handleRemove.bind(this, idA)}></button>
                              {
                                    this.state.isOpenUpdate === idA ? (
                                        <Modal closeModal={this.closeModal.bind(this)} onAction={'update_info'} whereIs={'about'} onId={idA}>
                                          <textarea placeholder="Текст новости" name="firstText" rows="10" defaultValue={firstText}/>

                                          <input type="submit" value="Редактировать поле"/>
                                        </Modal>
                                    ) : null
                                  }
                                  {
                                    this.state.isOpenDelete === idA ? (
                                      <Modal closeModal={this.closeModal.bind(this)} onAction={'remove_info'} whereIs={'about'} onId={idA}>
                                        <p> Вы уверены что хотите удалить данные?</p>
                                        <input type="submit" value="Удалить"/>
                                      </Modal>
                                    ) : null
                                  }
                          </td>
                          <td>
                            {firstText}
                          </td>
                      </tr>
                        )
                      })
            
                    }
                        </tbody>
                    </table>
                      
                    </section>  
                  )
                }
                {
                  this.state.tabs === this.state.tabsName[1].id && (
                    <section className="tab_about-acrticle_document">
                    <div className="tab_about-toolbar">
                      <h3>Панель документы</h3>
                      <button className="tab_news-add" onClick={this.handleClick.bind(this)}> Добавить документ</button>
                                   {
                         this.state.isOpen ? (
                        <Modal closeModal={this.closeModal.bind(this)}  onAction={'add_doc'} whereIs={'about'} file={this.files} select={this.state.value}  nameAdd={this.state.document} type={'doc'}>
                            <label>
                                <h3>Выберите год:</h3>
                            <select value={this.state.value} onChange={this.handleChange.bind(this)}>
                              <option disabled  value="Выберите год">Выберите год</option>
                              {
                                this.selections.map(el => {
                                  return (
                                    <option value={el} key={el}>{el}</option>
                                  )
                                })
                              }
                            </select>
                            </label>

                            <input type="file" ref={this.files} onChange={this.handleFile.bind(this)}></input>
                            <input type="submit" disabled={this.state.value === 'Выберите тип год' || this.state.leng === 0 } value="Добавить файл"/>
                        </Modal>
                         ) : null
                      }
                    </div>
                      <table>                      
                        <thead>
                          <tr className="tab_about-table-row">
                            <th>Действие</th>
                            <th>Год</th>
                            <th>Документы</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.aboutDoc.map(({idFD, nameFD, FotoAndDocument,year}) => {
                                if (nameFD === this.state.document) {
                                  return (
                              <tr className="tab_about-acrticle_document-card" key={idFD}>
                              <td>
                                <button className="tab_news-remove" title="Удалить" onClick={this.handleRemove.bind(this, idFD)}></button>
                                  {
                                  this.state.isOpenDelete === idFD ? (
                                    <Modal closeModal={this.closeModal.bind(this)} onAction={'remove_doc'} type={'doc'} whereIs={'about'} onId={idFD}>
                                      <p> Вы уверены что хотите удалить документы?</p>
                                      <input type="submit" value="Удалить"/>
                                    </Modal>
                                  ) : null
                                }
                                </td>
                                <td> {year}</td>
                                <td>
                                  <a href={'https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/fd/'+FotoAndDocument} target="_blank" rel="noopener noreferrer">{FotoAndDocument.split('.').slice(0,-1).join('')}</a>
                                </td>
                              </tr>
                          )
                              } else return null
                          })
                        }

                        </tbody>
                      </table>
                        
                    </section>
                  )
                }
                {
                  this.state.tabs === this.state.tabsName[2].id && (
                    <section className="tab_about-acrticle_foto">
                      <div className="tab_about-toolbar">
                        <h3>Панель фотографии</h3>
                        <button className="tab_news-add" onClick={this.handleClick.bind(this)}> Добавить Фотографию</button>
                                   {
                         this.state.isOpen ? (
                        <Modal closeModal={this.closeModal.bind(this)}  onAction={'add_img'} whereIs={'about'} file={this.files}  nameAdd={this.state.foto} type={'img'}>
                            {this.state.imgLoad.load && (
                                 <img  alt={this.state.imgLoad.alt} src={this.state.imgLoad.src}/>
                            )

                            }
                            <input type="file" ref={this.files} onChange={this.handleImg.bind(this)}></input>

                            <input type="submit" disabled={this.state.leng === 0 } value="Добавить фотографию"/>
                        </Modal>
                         ) : null
                      }
                      </div>
                    <div className="tab_about-acrticle_fotoGrid">

                  {
                    this.props.aboutImg.map(({idFD, nameFD, FotoAndDocument,year}) => {
                      if(nameFD === this.state.foto) {
                        return (
                        <div className="tab_about-acrticle_fotoGrid-card" key={idFD}>
                            <div className="tab_about-acrticle_fotoGrid-card-container">
                              <img title={FotoAndDocument.split('.').slice(0,-1).join('')} alt={FotoAndDocument.split('.').slice(0,-1).join('')} src={'https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/fd/'+FotoAndDocument}/>
                              <button className="tab_news-remove" title="Удалить" onClick={this.handleRemove.bind(this, idFD)}></button>
                            </div>
                            {
                                  this.state.isOpenDelete === idFD ? (
                                    <Modal closeModal={this.closeModal.bind(this)} onAction={'remove_img'} type={'img'} whereIs={'about'} onId={idFD}>
                                      <img title={FotoAndDocument.split('.').slice(0,-1).join('')} alt={FotoAndDocument.split('.').slice(0,-1).join('')} src={'https://xn--80aefffvbcb7ac2ag5d.xn--p1ai/fd/'+FotoAndDocument}/>
                                      <p> Вы уверены что хотите удалить фотографию?</p>
                                      <input type="submit" value="Удалить"/>
                                    </Modal>
                                  ) : null
                                }
                        </div>
                      )
                        } else return null
                    })
                }
                    </div>
                  </section>
                  )
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    aboutInfo: state.aboutInfo,
    aboutDoc: state.aboutDoc,
    aboutImg: state.aboutImg,
  }
}

export default  connect(mapStateToProps,null)(TabAbout);