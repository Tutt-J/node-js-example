'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Hardnesses",
      [
        {
          name: "tender",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "medium-hard",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "hard",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hardnesses', null, {});
  }
};
