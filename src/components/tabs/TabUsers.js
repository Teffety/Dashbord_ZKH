import React from 'react';
import {connect} from 'react-redux'
import '../../style/tab_users.scss'

class TabUsers extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className="tab_users">
                <h1>Данный раздел находится в разработке</h1>
            </div>
        )
    }

}

export default connect()(TabUsers);