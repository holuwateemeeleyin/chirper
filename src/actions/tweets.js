import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'


export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

// Funcion for Adding Tweets

function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet,
    }
    
}

export function handleAddTweet(text, replyingTo) {
    return (dispatch, getState)=> {
        const { authedUser } = getState()
        // show loader first
        dispatch(showLoading())

        return saveTweet ({
            // we pass in the text that is being typed, the author, and if the tweet is a reply to another tweet
            text,
            author: authedUser,
            replyingTo
        })
        .then((tweet) => dispatch(addTweet(tweet)))
        .then(()=> dispatch(hideLoading()))
    }
    
}

export function receiveTweets (tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

// actions for liking the tweet
function toggleTweet ({id, authedUser, hasLiked}){
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

// info has the properties of id, authedUser, hasLiked
export function handleToggleTweet (info) {
    return (dispatch) => {
        dispatch (toggleTweet(info))

        return saveLikeToggle(info)
            .catch((e)=> {
                console.warn('Error in handleToggleTweet: ', e);
                dispatch(toggleTweet(info))
                alert('There was an error liking the tweet. Try again')
            })
    }
}