import React from "react";
import style from './FormsControl.module.css'

export const Textarea = ({input, meta, ...props}) => {
    return (
        <div className={style.inputPostContainer}>
            <textarea {...input} {...props} className={meta.error && meta.touched ? style.formError + ' ' + style.inputPost : style.inputPost} ></textarea>
            {meta.error && meta.touched && <div><span className={style.error}>{meta.error}</span></div>}
        </div>
    )
}

export const TextareaMessage = ({input, meta, ...props}) => {
    return (
        <div>
            <textarea {...input} {...props} className={meta.error && meta.touched ? style.formError + ' ' + style.inputPost : style.inputPost} ></textarea>
            {meta.error && meta.touched && <div><span className={style.error}>{meta.error}</span></div>}
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    return (
        <div className={style.inputLoginContainer}>
            <input {...input} {...props} className={meta.error && meta.touched ? style.formError + ' ' + style.inputLogin : style.inputLogin} ></input>
            {meta.error && meta.touched && <div><span className={style.error}>{meta.error}</span></div>}
        </div>
    )
}