import React from "react";
import "./ListTile.css";

import { FaUserCircle } from "react-icons/fa";

const ListTile = ({ name, children, online = false }) => {
  return (
    <div className="list-tile">
      <div className="leading">
        <FaUserCircle className="icon" color={online ? "green" : "#e8e8e8"} />
        <h3>{name}</h3>
      </div>
      <div className="trailing">{children}</div>
    </div>
  );
};

export default ListTile;
