import React from "react";

export default function Post({ post, user }) {
  const isAuthor = post.author.id === user.id;
  console.log(isAuthor);
  return (
    <>
      <div className="post">
        <b>{isAuthor ? "You" : post.author.username}</b>:
        <span>{post.content}</span>
      </div>
      <br />
    </>
  );
}
