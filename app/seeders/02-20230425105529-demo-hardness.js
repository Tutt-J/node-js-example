'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Hardnesses",
      [
        {
          name: "tender",
        },
        {
          name: "medium-hard",
        },
        {
          name: "hard",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hardnesses', null, {});
  }
};
