import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './newTweet'
import TweetPage from './tweetPage'
import Nav from './nav'


class App extends Component {
  // dispatch all the actions that need to be dispatched
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {/* if the authedUser is not equal to dashboard, we render null while waiting */}
            {/* if loading is true, render null, render dashboard if it is not */}
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/tweet/:id' component={TweetPage} />
                <Route path='/new' component={NewTweet} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}
// passed in authedUser as params cos we want to information from authedUser
function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App)