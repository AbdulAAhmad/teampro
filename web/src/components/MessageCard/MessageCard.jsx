import React, { useEffect, useState } from "react";
import "./MessageCard.css";

import io from "socket.io-client";

import CustomButton from "../CustomButton/CustomButton";
import ListTile from "../ListTile/ListTile";
import { useAuthState } from "../../context/auth/auth.context";
import useDataApi from "../../hooks/useDataApi";

const USERS_ROOT_URL = `${process.env.REACT_APP_API_URL}/users`;

const MessageCard = () => {
  const { token, user_id } = useAuthState();

  const [{ data: users }] = useDataApi(USERS_ROOT_URL, [], {
    method: "GET",
    headers: { Authorization: token },
  });

  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);

  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { autoConnect: false });

    newSocket.auth = { user_id };
    newSocket.connect();

    setSocket(newSocket);

    return () => newSocket.close();
  }, [user_id]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (res) => {
        setResponse(res);
        // console.log(res);
      });

      socket.on("users", (res) => {
        setConnectedUsers(res.map((user) => user.user_id));
        console.log(res);
      });
    }
    return () => {
      if (socket) {
        socket.off("message");
        socket.off("users");
      }
    };
  }, [socket]);

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  const handleCheckbox = (e) =>
    e.target.checked
      ? setRecipients((prev) => [...prev, e.target.name])
      : setRecipients((prev) => prev.filter((ele) => ele !== e.target.name));

  const handleSelectAll = () =>
    setRecipients(() => users.map((user) => user.id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket && socket.connected) {
      socket.emit("message", { message, recipients, sender: user_id });
    }
    setMessage("");
  };

  return (
    <div className="message-card">
      <div className="message-card-header">
        <h2>The Team</h2>
        <CustomButton onClick={handleSelectAll}>Select All</CustomButton>
      </div>
      <form action="" onSubmit={handleSubmit} className="message-card-form">
        {users &&
          users.map((user) => (
            <ListTile
              key={user.id}
              name={user.name}
              online={connectedUsers.includes(user.id)}
            >
              <input
                type="checkbox"
                name={user.id}
                onChange={handleCheckbox}
                checked={recipients.includes(user.id)}
              />
            </ListTile>
          ))}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <CustomButton type="submit">Send Message</CustomButton>
      </form>
    </div>
  );
};

export default MessageCard;
