module.exports.user = (user) => {
  if (!user) return null;
  return { username: user.username, id: user._id };
};

module.exports.post = (post) => {
  if (!post) return null;
  const temp = post;
  const doc = post._doc;
  delete doc._id;
  delete doc.__v;
  return { ...doc, id: temp._id };
};
