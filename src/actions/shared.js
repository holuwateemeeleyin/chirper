import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveTweets } from "./tweets";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading} from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData (){
    return (dispatch)=>{
        // before we show our initial data, we show the loading bar
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, tweets}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))
                dispatch(setAuthedUser(AUTHED_ID))
                // hide loading after showing our data
                dispatch(hideLoading())
            })
    }
}