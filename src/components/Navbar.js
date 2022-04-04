import React from "react";
import logo from "../WW-logo-hvid.png";

export default function Navbar() {
  return (
    <header>
      <div className="navbar">
        <img src={logo} alt={logo} />
      </div>
    </header>
  );
}
