"use strict";
module.exports = (sequelize, DataTypes) => {
  const Alert = sequelize.define(
    "Alert",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      source: DataTypes.STRING,
      priority: DataTypes.INTEGER,
      text: DataTypes.STRING
    },
    {}
  );
  Alert.associate = function(models) {
    // associations can be defined here
  };
  return Alert;
};
