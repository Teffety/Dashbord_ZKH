import React from 'react';
import Header from './components/Header.js'
import Main from './components/Main.js'
import Sign from './components/signIn.js'
import {connect} from 'react-redux';


function App(props) {
  return (
        <div className="app">        
              <Header/>
              <Main/>
              {
                props.error ? (
                   <div className="error_block"> 
                    <span>
                      {props.error.message}
                      <i>{props.error.count}</i>
                    </span>
                   </div>
                ) : null
              } 
        </div>
  );
}
function mapStateToProps(state) {
  return {
    error:state.error
  };
}
export default connect(mapStateToProps,null)(App);
