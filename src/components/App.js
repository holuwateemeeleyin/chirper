import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './newTweet'

class App extends Component {
  // dispatch all the actions that need to be dispatched
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        <LoadingBar/>
        {/* if the authedUser is not equal to dashboard, we render null while waiting */}
        {/* if loading is true, render null, render dashboard if it is not */}
        { this.props.loading === true
          ?null
          : <Dashboard/>
          // : <NewTweet/>
        }
      </div>
    )
  }
}
// passed in authedUser as params cos we want to information from authedUser
function mapStateToProps({ authedUser}){
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App)