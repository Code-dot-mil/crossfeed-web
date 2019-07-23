"use strict";
module.exports = (sequelize, DataTypes) => {
  const TaskStatus = sequelize.define(
    "TaskStatus",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      command: DataTypes.STRING,
      status: DataTypes.STRING,
      percentage: DataTypes.INTEGER
    },
    {}
  );
  TaskStatus.associate = function(models) {
    // associations can be defined here
  };
  return TaskStatus;
};
