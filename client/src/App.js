import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { getUser } from "./utils/api";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    getUser().then(({ data }) => {
      setUser(data?.user);
    });
  }, []);
  console.log(user);
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact={true}>
          <Login setUser={setUser} user={user} />
        </Route>
        <Route path="/signup" exact={true}>
          <Signup setUser={setUser} user={user} />
        </Route>
        <Route path="/home" exact={true}>
          <Home user={user} />
        </Route>
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
