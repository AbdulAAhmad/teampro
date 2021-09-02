import React from "react";
import "./ListTile.css";

import { FaUserCircle } from "react-icons/fa";

const ListTile = ({ name, children }) => {
  return (
    <div className="list-tile">
      <div className="leading">
        <FaUserCircle className="icon" />
        <h3>{name}</h3>
      </div>
      <div className="trailing">{children}</div>
    </div>
  );
};

export default ListTile;
