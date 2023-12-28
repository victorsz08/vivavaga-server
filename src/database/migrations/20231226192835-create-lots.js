'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.INTEGER
      },
      client: {
        type: Sequelize.STRING
      },
      plate: {
        type: Sequelize.STRING
      },
      type_vehicle: {
        type: Sequelize.ENUM("Car","Motocycle")
      },
      price: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.ENUM("Active","Closed"),
        defaultValue: "Active"
      },
      company: {
        type: Sequelize.UUID
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lots');
  }
};