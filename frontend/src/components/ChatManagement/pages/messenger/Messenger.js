import "./messenger.css";
import Topbar from "../../topbar/Topbar";
import Conversation from "../../conversations/Conversation";
import Message from "../../message/Message";
import ChatOnline from "../../chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
 console.log(user)
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("addUser", user._id);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(
  //       user.followings.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   });
  // }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:8070/api/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8070/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:8070/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  function filterContent(data, searchTerm) {
    console.log(data)
    const result = data.filter((conversation) =>
    conversation.groupName.toLowerCase().includes(searchTerm))
    console.log("Hiii"+result)
    setConversations(result)
}

function handleSearch(event) {
    const searchTerm = event.currentTarget.value
    console.log(searchTerm)
    axios.get("http://localhost:8070/api/conversations/" + user._id).then((res) => {
      console.log(res.data)    
    filterContent(res.data, searchTerm.toLowerCase())
        console.log(res.data.result)
    }).catch((error) => {
        alert("Failed to search student group with the given keyword")
    })
}
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
    
     <div className="container" align="center" style={{ width: "80%",padding: "40px", background: "rgb(255, 255, 255)",borderRadius: "15px",boxShadow:"0px 24px 48px 0 rgba(0,0,0,0.1)" }} >
     <Topbar/>
         
            <div className="messenger">
        <div className="chatMenu" style={{ borderRadius: "15px"}}>
        <br/><br/>
          <div className="searchbar" style={{ background:"rgb(201, 235, 249)"}}>
          
          <div className="col-5">
                    <div className="px-3 search">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search Friends"
                            onChange={handleSearch}
                            required
                        />
                        <br />
                    </div>
                </div>
           
          </div>
          <div className="chatMenuWrapper">
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox" style={{ background:"rgb(163, 214, 238)"}}>
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      {console.log(user.imgrl)}
                      <Message message={m} own={m.sender === user._id} user={user.imgUrl} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
    
      </div>              
        </div>
      
    </>
  );
}
