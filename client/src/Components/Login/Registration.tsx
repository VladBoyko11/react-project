import React from "react";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {registration} from "../../redux/authSlice";
import {connect, ConnectedProps} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Form, Button} from 'react-bootstrap'
import {Input} from "../common/FormControl";
import { RootState } from "../../redux/store";

const Registration: React.FC<RegistrationPropsType> = (props) => {

    const submitForm: FormSubmitHandler = (formData: {email?: string, password?: string}) => {
        if(formData.email && formData.password) props.registration({email: formData.email, password: formData.password})
    }

    const navigate = useNavigate()
    if(props.isAuth){
        navigate('/user', {replace: true})
        return null
    }

    return (
        <div>
            <h1>Registration</h1>
            <LoginReduxForm {...props} onSubmit={submitForm}/>
        </div>
    )
}

const LoginForm: React.FC<InjectedFormProps> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group>
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Field id="email" placeholder='email' name='email' component={Input}/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Field id="password" placeholder='password' name='password' component={Input}/>
            </Form.Group>
            <div> <Button type='submit' variant="success">Registration</Button> </div>
        </Form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth
})

const connector =  connect(mapStateToProps, { registration })

type PropsFromRedux = ConnectedProps<typeof connector>
type RegistrationPropsType = PropsFromRedux  

export default connector(Registration)