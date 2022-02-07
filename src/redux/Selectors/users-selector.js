import {createSelector} from 'reselect'

export const getUsers = (state) => { return state.usersPage.users }   
export const getTotalPage = (state) => { return state.usersPage.totalPage }   
export const getPageSize = (state) => { return state.usersPage.pageSize }   
export const getCurrentPage = (state) => { return state.usersPage.currentPage }   
export const getIsFetching = (state) => { return state.usersPage.isFetching }   
export const getFollowingUsers = (state) => { return state.usersPage.isFollowingUsers }   