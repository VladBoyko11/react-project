import React from "react";
import { connect } from "react-redux";
import { follow, setCurrentPage, unfollow, requestUsers } from "../../../redux/users-reducer";
import Users from "./Users";
import Preloader from '../../common/Preloader/Preloader'
import {getUsers, getTotalPage, getPageSize, getCurrentPage, getIsFetching, getFollowingUsers} from '../../../redux/Selectors/users-selector'

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (page) => {
    this.props.setCurrentPage(page);

    this.props.requestUsers(page, this.props.pageSize)
  };

  render() {
    return (
      <div>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
        totalPage={this.props.totalPage}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        setUsers={this.props.setUsers}
        toggleIsFollowing={this.props.toggleIsFollowing}
        followingUsers={this.props.followingUsers}
      />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    totalPage: getTotalPage(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingUsers: getFollowingUsers(state)
  };
};

export default connect(mapStateToProps, {follow, setCurrentPage, unfollow, requestUsers})(UsersContainer);
