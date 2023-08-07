import { FormControl } from "@mui/material"
import React from "react"

// export const Textarea = ({input, meta, ...props}) => {
//     return (
//         <div className={style.inputPostContainer}>
//             <textarea {...input} {...props} className={meta.error && meta.touched ? style.formError + ' '
//                 + style.inputPost : style.inputPost} />
//             {meta.error && meta.touched && <div><span className={style.error}>{meta.error}</span></div>}
//         </div>
//     )
// }

// export const TextareaMessage = ({input, meta, ...props}) => {
//     return (
//         <div>
//             <textarea {...input} {...props} className={meta.error && meta.touched ? style.formError + ' '
//                 + style.inputPost : style.inputPost} />
//             {meta.error && meta.touched && <div><span className={style.error}>{meta.error}</span></div>}
//         </div>
//     )
// }

export const Input = ({input, meta, ...props}: any) => {
    return (
        <div className={'mb-3'}>
            <FormControl {...input} {...props} />
            {/*{meta.error && meta.touched && <div><span className={style.error}>{meta.error}</span></div>}*/}
        </div>
    )
}