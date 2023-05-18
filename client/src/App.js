import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { posts } from "./data";
import { io } from "socket.io-client";

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  const changeHandler = (event) => {
    setUserName(event.target.value);
  };

  const clickHandler = () => {
    setUser(userName);
  };

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">Hello, {user}!</span>
        </>
      ) : (
        <div className="login">
          <input type="text" placeholder="username" onChange={changeHandler} />
          <button onClick={clickHandler}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
