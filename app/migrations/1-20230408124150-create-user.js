'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "firstName is required" },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "firstName is required" },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "email is required" },
          isEmail: { msg: "invalid email" },
        },
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password is required" },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        timestamps: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};