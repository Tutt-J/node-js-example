"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Types",
      [
        {
          name: "softwood",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "exotic wood",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "noble and hardwoods",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {});
  },
};
