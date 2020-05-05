import React from 'react';
import Header from './components/Header.js'
import Main from './components/Main.js'
import Sign from './components/signIn.js'
import {connect} from 'react-redux';


function App(props) {
  return (
        props.token ? (
        <div className="app">        
              <Header/>
              <Main/>
        </div>
      ) : (
            <Sign/>
      )
  );
}
function mapStateToProps(state) {
  return {
    token: state.token
  };
}
export default connect(mapStateToProps,null)(App);
