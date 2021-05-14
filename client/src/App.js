import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import User from "./components/User";
import { getUser } from "./utils/api";
import getSocket from "./utils/socket.io";

function App() {
  const [user, setUser] = React.useState(null);
  const [socket, setSocket] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getUser().then(({ data }) => {
      setUser(data?.user);
      const soc = getSocket();
      setSocket(soc);
      setLoading(false);
    });
  }, []);
  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="App">
      <Switch>
        <Route path="/login" exact={true}>
          <Login setUser={setUser} user={user} />
        </Route>
        <Route path="/signup" exact={true}>
          <Signup setUser={setUser} user={user} />
        </Route>
        <Route path="/home" exact={true}>
          <Home user={user} setUser={setUser} socket={socket} />
        </Route>
        <Route path="/user/:id" exact={true}>
          <User user={user} socket={socket} />
        </Route>
        <Redirect to="/home" />
      </Switch>
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
