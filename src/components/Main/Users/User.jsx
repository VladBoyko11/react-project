import React from "react";
import style from './Users.module.css'
import {NavLink} from 'react-router-dom'

const User = (props) => {
    return (
        <div className={style.user}>
            <NavLink to={`/profile/${props.user.id}`}><img className={style.userLogo} alt="user-logo" src={props.user.photos.small != null ? props.user.photos.small : 'https://img1.akspic.ru/originals/3/4/8/5/6/165843-2021_dodge_challenger_muscle_car-1920x1080.jpg'}></img></NavLink>
            <h2 className={style.userName}>{props.user.name}</h2>
            {/* <div className={style.userEducation}>Education: {props.user.education}</div>
            <div className={style.userLocation}>
                <p>City: {props.user.location.city}, Country: {props.user.location.country}</p>
            </div> */}
            <div className={style.followed}>{props.user.followed ? 'true': 'false'}</div>
            {props.user.followed 
                ? <button disabled={props.followingUsers.some(id => id === props.user.id)} className={style.userButtonUnFollow + ' ' + style.userButton} onClick={() => { 
                    props.unfollow(props.user.id)
                    }} >Following</button> 
                : <button disabled={props.followingUsers.some(id => id === props.user.id)} className={style.userButtonFollow + ' ' + style.userButton} onClick={() => {
                    props.follow(props.user.id)
                    }}>Follow</button>}
        </div>
    )
}

export default User