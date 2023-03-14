import React from "react";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import {initializedThunk} from '../../redux/app-reducer'
import Preloader from "../common/Preloader/Preloader";
import style from './Main.module.css'

const UsersContainer = React.lazy(() => import("./Users/UsersContainer"))
const Login = React.lazy(() => import("../Login/Login"))
const WithUrlDataProfileContainer = React.lazy(() => import("./Profile/WithUrlDataProfileContainer"))
const MessageContainer = React.lazy(() => import("./Messages/MessageContainer"))

class Main extends React.Component {
  componentDidMount() {
    this.props.initializedThunk()
  }
  render() {

    if(!this.props.initialized) {
      return <Preloader />
    }

    return (
      <main>
        <Navbar />
        <div className={style.main}>
          <Routes>
            <Route
              path="/messages"
              element={<React.Suspense fallback={<div>Loading</div> }> <MessageContainer store={this.props.state}/> </React.Suspense>}
            ></Route>
            <Route
              path="/profile/"
              element={<React.Suspense fallback={<div>Loading</div> }> <WithUrlDataProfileContainer store={this.props.state}/> </React.Suspense>}
            >
              <Route path=":userId" element={<WithUrlDataProfileContainer />} />
            </Route>
            <Route
              path="/users"
              element={<React.Suspense fallback={<div>Loading</div> }> <UsersContainer store={this.props.state}/> </React.Suspense>}
            ></Route>
            <Route
              path="/login"
              element={<React.Suspense fallback={<div>Loading</div> }> <Login store={this.props.state}/> </React.Suspense>}
            ></Route>
          </Routes>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializedThunk})(Main);
