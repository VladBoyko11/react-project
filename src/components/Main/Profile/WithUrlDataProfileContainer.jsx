import React from "react";
import {useNavigate, useParams} from 'react-router-dom'
import { connect } from "react-redux";
import ProfileContainer from "./ProfileContainer";
import {addPost} from '../../../redux/profile-reducer'
import {withAuthRedirect} from '../../../hoc/withAuthRedirect'
import { compose } from "redux";

const mapStateToProps = (state) => {
    return {
      posts: state.profilePage.posts,
      profile: state.profilePage.profile,
      status: state.profilePage.status,
      userId: state.auth.userId,
      isAuth: state.auth.isAuth
    }
  }

const WithUrlDataProfile = (props) => {
  let { userId } = useParams();
  const navigate = useNavigate()
  if (!userId) {
    userId = props.userId;
    if(!userId) {
      navigate('/login', {replace: true})
    }
  } 
  return <ProfileContainer userId={userId}/>
};

export default compose(
  connect(mapStateToProps, {addPost}),
  withAuthRedirect
)(WithUrlDataProfile)
