import { usersAPI } from "../API/API";

let initialState = {
  users: [],
  totalPage: 22,
  pageSize: 6,
  currentPage: 1,
  isFetching: false,
  isFollowingUsers: [],
  followingUsers: []
};
export const userReducer = (state = initialState, action) => {
  const FOLLOW = "FOLLOW";
  const UNFOLOW = "UNFOLLOW";
  const SET_USERS = "SET_USERS";
  const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
  const SET_TOTAL_PAGE = "SET_TOTAL_PAGE";
  const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
  const TOGGLE_FOLLOWING_USERS = "TOGGLE_FOLLOWING_USERS";
  const SET_FOLLOWING_USERS = "SET_FOLLOWING_USERS";
  // eslint-disable-next-line default-case
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            user.followed = true;
            return { ...user };
          }
          return user;
        }),
      };
    }
    case UNFOLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            user.followed = false;
            return { ...user };
          }
          return user;
        }),
      };
    }
    case SET_USERS: {
      return { ...state, users: [...action.users] };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_PAGE: {
      return { ...state, totalPage: action.totalPage };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_FOLLOWING_USERS: {
      return {
        ...state,
        isFollowingUsers: action.isFollowing
          ? [...state.isFollowingUsers, action.userId]
          : state.isFollowingUsers.filter((user) => user !== action.userId),
      };
    }
    case SET_FOLLOWING_USERS: {
      return {
        ...state,
        followingUsers: action.isFollowing
          ? [...state.followingUsers, action.userId]
          : state.followingUsers.filter((user) => user !== action.userId),
      };
    }
    default:
      return state;
  }
};

export const requestUsers = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalPage(data.totalCount));
    });
  };
};

export const follow = (userId) => {
  return (dispatch) => {
    dispatch(toggleIsFollowing(true, userId));
    usersAPI.postFollowToUser(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(followSuccess(userId));
        dispatch(setFollowingUsers(true, userId))
      }
      dispatch(toggleIsFollowing(false, userId));
    });
  };
};

export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleIsFollowing(true, userId))
    usersAPI.deleteFollowingUser(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
        dispatch(setFollowingUsers(false, userId))
      }
      dispatch(toggleIsFollowing(false, userId))
    });
  };
};

export const followSuccess = (userId) => ({ type: "FOLLOW", userId: userId });
export const unfollowSuccess = (userId) => ({
  type: "UNFOLLOW",
  userId: userId,
});
export const setUsers = (users) => ({ type: "SET_USERS", users: users });
export const setCurrentPage = (page) => ({
  type: "SET_CURRENT_PAGE",
  currentPage: page,
});
export const setTotalPage = (totalPage) => ({
  type: "SET_TOTAL_PAGE",
  totalPage: totalPage,
});
export const toggleIsFetching = (isFetching) => ({
  type: "TOGGLE_IS_FETCHING",
  isFetching,
});
export const toggleIsFollowing = (isFollowing, userId) => ({
  type: "TOGGLE_FOLLOWING_USERS",
  isFollowing,
  userId,
});
const setFollowingUsers = (isFollowing, userId) =>({type: 'SET_FOLLOWING_USERS', isFollowing, userId })
