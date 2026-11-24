import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

function Messages() {
  const { user } = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  // Get messages belonging to the logged-in user
  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:8080/messages/user/" + user.user_id)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError("Failed to load messages.");
        });
    }
  }, [user]);

  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <p>View your sent and received messages.</p>

      {!user && <p>Please log in to view your messages.</p>}

      {error && <p>{error}</p>}

      {user && (
        <div className="messages-list">
          {messages.length === 0 ? (
            <p>You have no messages yet.</p>
          ) : (
            messages.map((message) => (
              <div className="message-card" key={message.message_id}>
                <h3>Message #{message.message_id}</h3>
                <p>From User: {message.sender_id}</p>
                <p>To User: {message.receiver_id}</p>
                <p>Project ID: {message.project_id}</p>
                <p>Message: {message.message_content}</p>
                <p>Status: {message.is_read ? "Read" : "Unread"}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Messages;
