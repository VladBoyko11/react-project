import React from "react";
import style from './Post.module.css'

const Post = (props) => {
    return (
        <div className={style.post}>
            <img alt='post_img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png" className={style.post_img}></img>
            <p className={style.post_text}>{props.text}</p>
        </div>
    )
}

export default Post