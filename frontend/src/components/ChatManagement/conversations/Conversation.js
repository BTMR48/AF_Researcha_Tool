import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    console.log("friend"+friendId)
    const getUser = async () => {
      await axios.get(`http://localhost:8070/student/${friendId}`).then((res) => {
        setUser(res.data.result)
            }).catch((error) => {
                alert("Failed to fetch the Marking details")
            })
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.imgUrl}
        alt=""
      />
      <span className="conversationName">{user?.groupname}</span>
    </div>
  );
}
