'use strict';
module.exports = (sequelize, DataTypes) => {
  const Domain = sequelize.define('Domain', {
    name: { type: DataTypes.STRING, unique: true },
    ip: DataTypes.STRING,
    ports: DataTypes.STRING,
    screenshot: DataTypes.STRING,
    services: DataTypes.STRING,
    response_data: DataTypes.STRING
  }, {});
  Domain.associate = function(models) {
    // associations can be defined here
  };
  return Domain;
};