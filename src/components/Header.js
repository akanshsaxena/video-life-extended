import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  const [search, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="header-container">
      <div className="header">
        <NavLink className="navLink header-color" to="/">
          <h1> Video </h1> <p> LIFE EXTENDED</p>{" "}
        </NavLink>{" "}
        <div className="search-box">
          <input
            type="text"
            name="search"
            onChange={handleChange}
            value={search}
            placeholder="Search with a title"
          />{" "}
          {search == "" ? (
            <NavLink className="btn disabled" to="#">
              {" "}
              🔍
            </NavLink>
          ) : (
            <NavLink className="btn" to={`/search/${search}`}>
              {" "}
              🔍
            </NavLink>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
