import {Routes, Route} from 'react-router-dom'
import Login from '../components/Login/Login'
import { connect } from "react-redux";

export const withAuthRedirect = (Component) => {
  const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuth
    }
  }
  const ComponentContainer = (props) => {
    if (!props.isAuth) {
        return (
            <Routes>
              <Route path="/" element={<Login />}></Route>
            </Routes>
          );
    }
    return <Component {...props}/>
  }
  const withAuthRedirectConnected = connect(mapStateToProps, {})(ComponentContainer)
  
  return withAuthRedirectConnected
};

