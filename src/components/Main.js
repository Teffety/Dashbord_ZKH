import React from 'react'
import TabMain from './tabs/TabMain.js'
import TabContact from './tabs/TabContact.js'
import TabRecviz  from './tabs/TabRecviz.js'
import TabCorup  from './tabs/TabCorup.js'
import TabAbout  from './tabs/TabAbout.js'
import TabUsers from './tabs/TabUsers.js'
import '../style/main.scss'

import { Switch, Route,Redirect  } from 'react-router-dom'

export default function Main(props){
    return(
        <main>
            <Switch>
                <Route exact path="/api/">
                    <Redirect  exact to="/news/" component={TabMain}/>
                </Route>
                <Route path="/news" component={TabMain}/>
                <Route path="/contact" component={TabContact}/>
                <Route path="/recviz" component={TabRecviz}/>
                <Route path="/corup" component={TabCorup}/>
                <Route path="/about" component={TabAbout}/>
                <Route path="/users" component={TabUsers}/>
            </Switch>
        </main>
    )
}