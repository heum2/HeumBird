"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("images", "UserId", {
      type: Sequelize.INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {}
};
