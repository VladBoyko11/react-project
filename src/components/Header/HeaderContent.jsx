import React from 'react'
import style from './Header.module.css'
import {NavLink } from 'react-router-dom'

const HeaderContent = (props) => {
    return(
        <header>
            <img className={style.logoBmw} alt='bmw' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png'></img>
            <h1>My Site</h1>
            <NavLink to='/login'>{props.isAuth ? props.email : 'authorization in progress'}</NavLink>
            {props.isAuth ? <button onClick={() => {
                props.logout()
            }}>Logout</button> : null}
            <img className={style.logoBmw} alt='bmw' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png'></img>
        </header>
    )
}
export default HeaderContent;