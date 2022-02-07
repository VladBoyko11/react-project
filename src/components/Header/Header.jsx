import React from "react";
import HeaderContainer from "./HeaderContainer";
import { Route, Routes } from "react-router-dom";

const Header = (props) => {
  return (
      <header>
        <div>
          <Routes>
            <Route
              path="/*"
              element={<HeaderContainer store={props.store} />}
            ></Route>
          </Routes>
        </div>
      </header>
  );
};

export default Header;
