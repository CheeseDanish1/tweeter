import React from "react";
import { Redirect } from "react-router";
import { getAllPosts, createPost } from "../utils/api";
import Post from "./Post";

export default function Home({ user, socket }) {
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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.children[0];
          createPost({ content: input.value, socket }).then(({ data }) => {
            setPosts((prev) => [...prev, data]);
            // console.log(data);
          });
          input.value = "";
        }}
      >
        <input type="text" placeholder="post content" />
        <button type="submit">Submit</button>
      </form>
      <div className="posts">
        {posts.map((post, i) => (
          <Post key={i} post={post} user={user} />
        ))}
      </div>
    </div>
  );
}
