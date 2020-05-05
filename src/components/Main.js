import React from 'react'
import TabMain from './tabs/TabMain.js'
import TabContact from './tabs/TabContact.js'
import TabRecviz  from './tabs/TabRecviz.js'
import TabCorup  from './tabs/TabCorup.js'
import TabAbout  from './tabs/TabAbout.js'
import '../style/main.scss'

import { Switch, Route } from 'react-router-dom'

export default function Main(props){
    return(
        <main>
            <Switch>
                <Route exact path="/" component={TabMain}/>
                <Route path="/contact" component={TabContact}/>
                <Route path="/recviz" component={TabRecviz}/>
                <Route path="/corup" component={TabCorup}/>
                <Route path="/about" component={TabAbout}/>
            </Switch>
        </main>
    )
}