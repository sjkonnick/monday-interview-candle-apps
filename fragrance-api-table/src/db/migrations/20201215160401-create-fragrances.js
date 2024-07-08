"use strict";
// DISCLAIMER: The usage of the SQLite database here is just for demo purposes. Apps built for production need to store tokens in encrypted databases such as Vault.
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Fragrances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      image_url: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Fragrances");
  },
};
