import React from "react";
import Messages from "./Messages";
import { sendMessage } from '../../../redux/message-reducer'
import {connect} from 'react-redux'
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import { compose } from "redux";

const mapStateToProps = (state) => {
  return {
    arrNames: state.messagePage.arrNames,
    arrMessages: state.messagePage.arrMessages
  }
}

export default compose(
  connect(mapStateToProps, { sendMessage }),
  withAuthRedirect
)(Messages)
