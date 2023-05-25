import React from "react";
import logo from "../../assets/images/speedlane.png";
import "./header.scss";

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="ED"></img>
      <div className="app-name">Employee Directory</div>
      <div className="menu-right">
        <div className="username">{"Ali Ousseily"} </div>
      </div>
    </div>
  );
}
