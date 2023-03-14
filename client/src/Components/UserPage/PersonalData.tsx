import React, {useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {setNewEmail} from "../../redux/authSlice";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {Form} from "react-bootstrap";
import {Input} from "../common/FormControl";
import style from './User.module.scss'
import {checkEmail} from "../common/Validators/Validators";
import { RootState } from "../../redux/store";

const PersonalData: React.FC<PersonalDataPropsType> = (props) => {
    const [formEditEmailActive, setFormEditEmailActive] = useState(false)

    const submitForm: FormSubmitHandler = (formData: {newEmail?: string}) => {
        if(formData.newEmail) props.setNewEmail({email: formData.newEmail, id: props.userId})
    }
    return (
        <div className={'ms-4'}>
            <h4>Your email address: {props.email}</h4>
            {formEditEmailActive ? <EditEmailReduxForm onSubmit={submitForm}/>: null}
            <div>
                <button className={'btn btn-warning w-25'} onClick={() => {
                    setFormEditEmailActive(true)
                }
                }>Edit email</button>
            </div>
            <div/>
        </div>
    )
}

const EditEmailForm:  React.FC<InjectedFormProps> = ({handleSubmit, error}) => {
    return <Form onSubmit={handleSubmit} className={'w-75'}>
        <Form.Group controlId="formNewEmail">
            <Form.Label>New email: </Form.Label>
            {error && <div className={'bg-danger'}>ERROR</div>}
            <Field className={'w-50'} placeholder='enter your new email' name='newEmail' component={Input} validate={[checkEmail]}/>
        </Form.Group>
        <button type='submit' className={style.submitBtn}>Enter</button>
    </Form>
}

const EditEmailReduxForm = reduxForm({
    form: 'editEmailForm'
})(EditEmailForm)

const mapStateToProps = (state: RootState) => ({
    userId: state.auth.id,
    email: state.auth.email
})

const connector = connect(mapStateToProps, {setNewEmail})
type ReduxPropsType = ConnectedProps<typeof connector>
type PersonalDataPropsType = ReduxPropsType

export default connector(PersonalData)