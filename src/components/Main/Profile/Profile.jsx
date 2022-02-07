import React from "react";
import style from "../Main.module.css";
import App from "../../App";
import Post from "../Posts/Post";
import ProfileStatus from "./ProfileStatus";
import { Field, reduxForm } from "redux-form";
import {required, maxLength} from '../../../Validators/Validators'
import {Textarea} from '../../common/FormsControl/FormsControl'

const maxLenght10 = maxLength(10)

const AddNewPostForm = (props) => {
  return (
    <form className={style.formPosts} onSubmit={props.handleSubmit}>
      <Field component={Textarea} name='newPostBody' placeholder='your post ...' validate={[required, maxLenght10]}/>
      <div className={style.inputSubmit_btnContainer}><button className={style.inputSubmit_btn}>Send</button></div>
    </form>
  );
};

const AddNewPostReduxForm = reduxForm({ form: 'addNewPostForm' })(AddNewPostForm)

const Profile = React.memo((props) => {

  console.log('profile render')

  let addPost = (value) => {
    props.addPost(value.newPostBody)
  };

  return (
    <div className={style.main}>
      <img
        className={style.img}
        alt="bmw m5"
        src="https://autoua.net/media/uploads/bmw/2021-bmw-m5-m5-competition.jpg"
      />
      <div className={style.content}>
        <img
          alt="profile-logo"
          className={style.profileLogo}
          src={
            props.profile.photos.large
              ? props.profile.photos.large
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png"
          }
        />
        <div className={style.profileInfo}>
          <h3>{props.profile.fullName}</h3>
          <p>{props.profile.lookingForAJobDescription}</p>
          <p>{props.profile.aboutMe}</p>
          <p>Education: V. N. Karazina</p>
          <ProfileStatus
            status={props.status}
            updateStatus={props.updateStatus}
          />
        </div>
      </div>
      <App />
      <div className={style.profilePosts}>
        <h1>My posts</h1>
        <AddNewPostReduxForm onSubmit={addPost}/>
        {props.posts.map((el) => (
          <Post text={el.post} id={el.id} />
        ))}
      </div>
    </div>
  );
});

export default Profile;
