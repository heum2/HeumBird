module.exports = (sequelize, DataTypes) => {
  const PostHashtag = sequelize.define(
    "PostHashtag",
    {},
    {
      freezeTableName: true
    }
  );
  return PostHashtag;
};
