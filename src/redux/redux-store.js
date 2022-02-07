import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import {profileReducer} from './profile-reducer'
import {messageReducer} from './message-reducer'
import {userReducer} from './users-reducer'
import {authReducer} from './auth-reducer'
import {appReducer} from './app-reducer'
import thunkMiddleWare from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    usersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer 
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)))

window.store = store

export default store