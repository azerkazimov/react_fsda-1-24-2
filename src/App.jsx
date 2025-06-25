import logo from "./logo.svg";
import "./App.css";
import Greet from "./greet";
import UserInfo from "./user-info";
import Counter from "./counter";
import { useEffect } from "react";
import { useState } from "react";
import UserPost from "./user-posts";

function App() {
  const [data, setData] = useState({ name: "" });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);


  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Greet name={"Azer"} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React here
        </a>

        <Counter />
        <UserInfo
          name={data.name}
          email={data.email}
          phone={data.phone}
          adress={data.address?.city}
        />
        <UserPost posts={posts}/>
      </header>
    </div>
  );
}

export default App;
