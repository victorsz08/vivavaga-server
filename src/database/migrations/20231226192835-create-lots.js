'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      status: {
        type: Sequelize.ENUM("Active","Closed"),
        defaultValue: "Active"
      },
      company: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        references: {
          key: 'id',
          model: 'companies'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lots');
  }
};