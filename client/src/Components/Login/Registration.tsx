import React from "react";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {registration} from "../../redux/authSlice";
import {connect, ConnectedProps} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Input} from "../common/FormControl";
import { RootState } from "../../redux/store";
import { Button, FormGroup, FormLabel } from "@mui/material";

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
        <form onSubmit={props.handleSubmit}>
            <FormGroup>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Field id="email" placeholder='email' name='email' component={Input}/>
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field id="password" placeholder='password' name='password' component={Input}/>
            </FormGroup>
            {/* <div> <Button type='submit' variant="success">Registration</Button> </div> */}
            <div> <Button type='submit'>Registration</Button> </div>
        </form>
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