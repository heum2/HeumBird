"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "ImageId", {
      type: Sequelize.INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {}
};
