"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("TaskStatuses", {
        command: {
          type: Sequelize.STRING
        },
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        status: {
          type: Sequelize.STRING
        },
        percentage: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW")
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW")
        }
      })
      .then(() =>
        queryInterface.addIndex("TaskStatuses", ["status"], {
          name: "status_index",
          using: "BTREE"
        })
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("TaskStatuses");
  }
};
