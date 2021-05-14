import React from "react";
import { Redirect } from "react-router";
import { getAllPosts, createPost } from "../utils/api";
import Post from "./Post";
import Logout from "./Logout";

export default function Home({ user, socket, setUser }) {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getAllPosts()
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((e) => console.log(`e=${e}`));
  }, []);

  React.useEffect(() => {
    socket.on("post", (post) => setPosts((prev) => [...prev, post]));
  }, []);

  if (!user) return <Redirect to="/login" />;
  return (
    <div /* style={{background: "#1DA1F2", height: "100%", width: "100%", position: "fixed", top: "0", left: "0", right: "0", bottom: "0"}} */>
      <br />
      <div className="posts"/*  style={{overflowY: "scroll"}} */>
        {posts.map((post, i) => (
          <Post key={i} post={post} user={user} />
        ))}
      </div>
      <form
      style={{display: "flex", bottom: "0", position: "sticky", width: "100%",}}
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.children[0];
          if (!input.value) return;
          createPost({ content: input.value, socket }).then(({ data }) => {
            setPosts((prev) => [...prev, data]);
          });
          input.value = "";
        }}
      >
        <textarea type="text" placeholder="post content"style={{flexGrow: "1", padding:"1rem", fontSize: "18px"}}/>
        <button type="submit" style={{width: "10%", fontSize: "18px"}}>Submit</button>
        <Logout style={{width: "10%", fontSize: "18px"}}/>
      </form>
    </div>
  );
}
