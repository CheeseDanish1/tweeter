import React from "react";
import { Redirect } from "react-router-dom";
import { signup } from "../utils/api";

export default function Signup({ user, setUser }) {
  const [error, setError] = React.useState(null);
  if (user) return <Redirect to="/home" />;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const [username, password] = Array.from(e?.target?.children)
            ?.filter((e) => e.localName === "input")
            ?.map(({ value }) => value);
          signup({ username, password })
            .then(({ data }) => {
              console.log(data);
              if (data.error) setError(data.message);
              else if (data.user) setUser(data.user);
              else console.log("wut");
            })
            .catch((e) => console.log(`Error=${e}`));
        }}
      >
        <input required type="text" placeholder="name" />
        <br />
        <input required type="password" placeholder="password" />
        <br />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
