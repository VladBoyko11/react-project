import React from "react";
import User from "./User";
import style from "./Users.module.css";

const Users = (props) => {
  let allpage = [];
  let currentPages = [];
  if (allpage.length === 0) {
    let countPage = Math.ceil(props.totalPage / props.pageSize);
    for (let i = 1; i <= countPage; i++) {
      allpage.push(i);
    }
  }
  for (
    let i = props.currentPage - 2;
    i <= props.currentPage + 6;
    i++
  ) {
    if (i < 1) {
        continue
    }
    currentPages.push(allpage[i] - 1);
  }
  return (
    <div>
      <div className={style.pages}>
        {currentPages.map((page) => (
          <span
            onClick={() => {
              props.onPageChanged(page);
            }}
            className={
              props.currentPage === page
                ? style.selectedPage
                : style.pageCount
            }
          >
            {page}
          </span>
        ))}
      </div>
      <div className={style.usersContainer}>
        {props.users.map((user) => (
          <User
            user={user}
            follow={props.follow}
            unfollow={props.unfollow}
            setUsers={props.setUsers}
            followingUsers={props.followingUsers}
            toggleIsFollowing={props.toggleIsFollowing}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
