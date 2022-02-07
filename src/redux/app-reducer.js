import {authorizatedUser} from '../redux/auth-reducer'
let initialState = {
  initialized: false
};

export const appReducer = (state = initialState, action) => {
  const INITIALIZED = "INITIALIZED";
  switch (action.type) {
    case INITIALIZED: {
      return { initialized: true };
    }
    default:
      return state;
  }
};

export const initialized = () => ({type: 'INITIALIZED'})

export const initializedThunk = () => (dispatch) => {
    let promise = dispatch(authorizatedUser())
    promise.then(response => {
        dispatch(initialized())
    })
}

