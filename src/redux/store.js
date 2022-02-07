import {profileReducer} from './profile-reducer'
import {messageReducer} from './message-reducer'

let store = {
  _state: {
    profilePage: {
      posts: [
        { post: "my post 1", id: "1" },
        { post: "my post 2", id: "2" },
        { post: "my post 3", id: "3" },
        { post: "my post 4", id: "4" },
        { post: "my post 5", id: "5" },
      ],
      newPost: "",
    },
    messagePage: {
      arrMessages: [
        "some message 1",
        "some message 2",
        "some message 3",
        "some message 4",
        "some message 5",
      ],
      arrNames: [
        { name: "Vlad", id: "1" },
        { name: "Andrey", id: "2" },
        { name: "Mark", id: "3" },
        { name: "Sasha", id: "4" },
      ],
      newMessageBody: '',
    },
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log("rerenderPage");
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.messagePage = messageReducer(this._state.messagePage, action)
    this._callSubscriber(this._state)
  },
};

window.state = store;

export default store;
