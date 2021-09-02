import React, { useState } from "react";
import "./MessageCard.css";

import CustomButton from "../CustomButton/CustomButton";
import ListTile from "../ListTile/ListTile";
import { useAuthState } from "../../context/auth/auth.context";
import useDataApi from "../../hooks/useDataApi";

const USERS_ROOT_URL = `${process.env.REACT_APP_API_URL}/users`;

const MessageCard = () => {
  const { token } = useAuthState();

  const [{ data: users }] = useDataApi(USERS_ROOT_URL, [], {
    method: "GET",
    headers: { Authorization: token },
  });

  const [recipients, setRecipients] = useState([]);

  const handleCheckbox = (e) =>
    e.target.checked
      ? setRecipients((prev) => [...prev, e.target.name])
      : setRecipients((prev) => prev.filter((ele) => ele !== e.target.name));

  const handleSelectAll = () =>
    setRecipients(() => users.map((user) => user.id));

  return (
    <div className="message-card">
      <div className="message-card-header">
        <h2>The Team</h2>
        <CustomButton onClick={handleSelectAll}>Select All</CustomButton>
      </div>
      <form action="" className="message-card-form">
        {users &&
          users.map((user) => (
            <ListTile key={user.id} name={user.name}>
              <input
                type="checkbox"
                name={user.id}
                onChange={handleCheckbox}
                checked={recipients.includes(user.id)}
              />
            </ListTile>
          ))}
        <textarea />
        <CustomButton>Send Message</CustomButton>
      </form>
    </div>
  );
};

export default MessageCard;
