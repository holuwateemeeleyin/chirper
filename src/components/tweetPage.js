import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './tweet'
import NewTweet from './newTweet'

class TweetPage extends Component {
    render(){
        const { id, replies } = this.props
        return (
            <div>
                <Tweet id={id}/>
                <NewTweet id={id}/>
                {replies.length !== 0 && <h3 className='center'>Replies</h3>}
                {/* loop over the replies */}
                <ul>
                    {replies.map((replyId) => (
                        <li key= {replyId}>
                            <Tweet id={replyId}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}


function mapStateToProps ({ authedUser, tweets, users }, props){
    const { id } = props.match.params

    return {
        id,
        //  If there doesn't exist a tweet with this ID, the reply will be empy array
        // if there is tweets[id], it will be individual tweets that will replies properties on it, which it is an array

        replies: !tweets[id]  
        ? []
        : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}
export default connect(mapStateToProps) (TweetPage)