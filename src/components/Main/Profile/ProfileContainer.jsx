import React, {useEffect} from "react";
import { connect } from "react-redux";
import {addPost, getUsers, getStatus, updateStatus} from '../../../redux/profile-reducer'
import Profile from './Profile'
import Preloader from "../../common/Preloader/Preloader";

const ProfileContainer = (props) => {
  useEffect(() =>{
    props.getUsers(props.userId)
    props.getStatus(props.userId)
  }, [])

  if(!props.profile){
    return (<Preloader />)
  }
  if(!props.status){
    return (<Preloader />)
  }
  
  return (
    <Profile {...props}/>
  )
}

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    profile: state.profilePage.profile,
    status: state.profilePage.status
  }
}

export default connect(mapStateToProps, { addPost, getUsers, getStatus, updateStatus})(ProfileContainer)