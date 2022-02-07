import React from "react";
import style from './Login.module.css'
import { Field, reduxForm } from 'redux-form'
import {Input} from '../common/FormsControl/FormsControl'
import {maxLength, required} from '../../Validators/Validators'
import { connect } from "react-redux";
import {login} from '../../redux/auth-reducer'
import { useNavigate } from "react-router-dom";

const maxLength30 = maxLength(30)

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <Field autoComplete='off' placeholder='email' name='email' component={Input} validate={[required, maxLength30]}/>
        <Field autoComplete='off' placeholder='password' name='password' component={Input} type='password' validate={[required, maxLength30]}/>
        <div className={style.checkboxDiv}><Field name='rememberMe' component={'input'} type='checkbox' /> remember me</div>
        {props.error && <div>{props.error}</div>}
        <div className={style.submitBtnContainer}> <button className={style.submitBtn} >Login</button> </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

const Login = (props) => {
    const navigate = useNavigate()

    const submitForm = (formData) =>{
        props.login(formData.email, formData.password, formData.rememberMe)

    }
    if(props.isAuth){
      navigate("/profile", { replace: true });
      return null
    }
  return (
    <div className={style.loginForm}>
        <h1> Login </h1>
        <LoginReduxForm onSubmit={submitForm}/>
    </div>
  )
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)
