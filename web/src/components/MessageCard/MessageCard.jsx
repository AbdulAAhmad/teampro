import React from "react";
import "./MessageCard.css";

import CustomButton from "../CustomButton/CustomButton";
import ListTile from "../ListTile/ListTile";

const MessageCard = () => {
  const users_name = [
    "Andrew Owens",
    "Pia Rees-Rogers",
    "Aoife Baker",
    "Rebecca Choeung",
  ];

  return (
    <div className="message-card">
      <div className="message-card-header">
        <h2>The Team</h2>
        <CustomButton>Select All</CustomButton>
      </div>
      <div className="message-card-body">
        {users_name.map((name) => (
          <ListTile name={name}>
            <input type="checkbox" />
          </ListTile>
        ))}
        <textarea />
        <CustomButton>Send Message</CustomButton>
      </div>
    </div>
  );
};

export default MessageCard;
