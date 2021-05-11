import React from "react";
import { Redirect } from "react-router";
import { getAllPosts, createPost } from "../utils/api";

export default function Home({ user }) {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getAllPosts()
      .then(({ data }) => {
        console.log(data);
        setPosts(data);
      })
      .catch((e) => console.log(`e=${e}`));
  }, []);
  if (!user) return <Redirect to="/login" />;
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.children[0];
          createPost({ content: input.value }).then(({ data }) => {
            setPosts((prev) => [...prev, data]);
            console.log(data);
          });
          input.value = "";
        }}
      >
        <input type="text" placeholder="post content" />
        <button type="submit">Submit</button>
      </form>
      <div className="posts">
        {posts.map((p) => (
          <p>
            <bold>{p.author.username}</bold>: {p.content}
          </p>
        ))}
      </div>
    </div>
  );
}
