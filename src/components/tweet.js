import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter} from 'react-router-dom'

class Tweet extends Component {

    handleLike = (e) => {
        e.preventDefault()

        const { dispatch, tweet, authedUser} = this.props

        dispatch (handleToggleTweet({
            id: tweet.id,
            hasLiked:tweet.hasLiked,
            authedUser
        }))
    }
    toParent = (e, id) => {
        e.preventDefault()
        //  Redirect to parent tweet
        this.props.history.push(`/tweet/${id}`)
    }
    render() {
        // get tweet from props
        const { tweet } = this.props

        if (tweet === null) {
            return <p>This Tweet doesn't exist</p>
        }
        console.log(this.props);

        // 
        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, parent, id
        } = tweet

        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            //  To redirect to parent tweet when clicked
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        {/* If it has no replies, do not shpw the number of replies */}
                        <span>{replies !== 0 && replies}</span>

                        <button className='heart-button' onClick={this.handleLike}>
                            {/* if tweet its liked, change color */}
                            {hasLiked === true
                                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                                : <TiHeartOutline className='tweet-icon' />
                            }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}
// we passed in the params we want to get from the state of our store
function mapStateToProps({ authedUser, users, tweets }, { id }) {
    // inorder to get the tweets and to know which tweets we are getting, hence we get the id
    const tweet = tweets[id]
    // tweets that we are responding to 
    //and if we don't have tweets we are responding to, we get null instead of an error
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser, // whenever we like a tweet or respond to a tweet, we want to who the autheticated user is
        // we need to get the tweet, but it needs to be formated
        // Also if tweets exist we get it, hence null
        tweet: tweet ?
            formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
            : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))