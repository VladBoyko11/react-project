import {profileAPI} from '../API/API'

let initialState = {
  posts: [
    { post: "my post 1", id: "1" },
    { post: "my post 2", id: "2" },
    { post: "my post 3", id: "3" },
    { post: "my post 4", id: "4" },
    { post: "my post 5", id: "5" },
  ],
  profile: null,
  status: ''
};

export const profileReducer = (state = initialState, action) => {
  const ADD_POST = "ADD_POST";
  const SET_PROFILE = "SET_PROFILE";
  const SET_STATUS = 'SET_STATUS'
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ADD_POST: {
      let stateCopy = { ...state };
      stateCopy.posts = [...state.posts] ;
      stateCopy.posts.push({
        post: action.newPost,
        id: "6",
      });
      stateCopy.newPost = "";
      return stateCopy;
    }
    case SET_STATUS: {
      return {...state, status: action.status};
    }
    case SET_PROFILE: return {...state, profile: action.profile}
    default:
      return state;
  }
};


export const getStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then(data => {
      dispatch(setStatus(data.data))
    })
  }
}

export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then(data => {
      if(data.data.resultCode === 0) {
        dispatch(setStatus(status))
      }
    })
  }
}

export const getUsers = (userId) => {
  return (dispatch) => {
    profileAPI.getUsers(userId).then((data) => { dispatch(setProfile(data)) });
  }
}

export const setStatus = (status) => ({ type: 'SET_STATUS', status})
export const addPost = (newPost) => ({ type: "ADD_POST", newPost });
export const setProfile = (profile) => ({ type: "SET_PROFILE", profile});
