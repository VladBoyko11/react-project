import React from "react";
import { connect } from "react-redux";
import HeaderContent from "./HeaderContent";
import {authorizatedUser, logout} from '../../redux/auth-reducer'

class HeaderContainer extends React.Component {
    componentDidMount(){
        this.props.authorizatedUser()
    }
    render() {
        return <HeaderContent {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.email
})

export default connect(mapStateToProps, {authorizatedUser, logout})(HeaderContainer)