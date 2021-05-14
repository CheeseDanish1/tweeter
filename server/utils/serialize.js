module.exports.user = (user) => {
  if (!user) return null;
  return { username: user.username, id: user._id };
};

module.exports.post = ({ author, content, uploaded, _id }) => {
  if (!author || !content || !uploaded || !_id) return null;
  return { author, content, uploaded, id: _id };
};
