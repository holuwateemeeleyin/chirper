import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {
    state={
        text:'',
        toHome: false,
    }
    handleChange = (e) => {
        const text = e.target.value

        this.setState(()=> ({
            text
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { text } = this.state
        const { dispatch, id } = this.props

        // Add tweet to store
        console.log('New Tweet: ', text)
        //  we need to grab the ID and pass it to handle new tweet, then if the this.props is a thing
        // that means we are replying to the tweet with this ID.
        // and if its not a thing, that means we are just composing a new tweet
        dispatch(handleAddTweet(text, id))

        this.setState(()=>({
            text:'',
            toHome: id ? false : true,
        }))
    }
render (){
    const { text, toHome } = this.state

    // redirected to / if submitted
    if (text, toHome ) {
        return <Redirect to='/' />
    }
    const tweetLeft = 280 - text.length
    return (
        <div>
            <h3 className ='center'> Compose New Tweet</h3>
            <form className='new-tweet' onSubmit={this.handleSubmit}>
                <textarea
                    placeholder='What is happening'
                    value={text}
                    onChange={this.handleChange}
                    className='textarea'
                    maxLength={280}
                />
                {/* display remaining words limit length */}
                {tweetLeft <= 100 && (
                    <div className='tweet-length'>
                        {tweetLeft}
                    </div>
                )}
                <button 
                    className='btn'
                    type='submit'
                    disabled={text === ''}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
}

export default connect ()(NewTweet)