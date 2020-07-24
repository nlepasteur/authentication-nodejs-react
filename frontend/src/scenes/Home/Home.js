import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  function connect(e) {
    const path = `/${e.target.textContent.toLowerCase()}`;
    history.push(path);
  }

  return (
    <div>
      <div>Home</div>
      <button onClick={connect}>Signup</button>
      <button onClick={connect}>Login</button>
    </div>
  );
};

export default Home;
