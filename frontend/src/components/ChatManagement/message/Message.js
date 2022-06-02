import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own ,user}) {
  console.log(user)
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        
        <img
          className="messageImg"
          src={own ? user :  "https://res.cloudinary.com/tbrmy/image/upload/v1653682791/cosupervisor/zbusvebbxppzckhxxpon.jpg"}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
