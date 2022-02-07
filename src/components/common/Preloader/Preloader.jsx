import React from "react";
import preloader from '../../../assets/preloader.svg'
import './Preloader.module.css'
const Preloader = () => {
    return <div><img className="preloader" alt="preloader" src={preloader}/></div>
}

export default Preloader