"use strict";
const { Type, Hardness } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const softwood = await Type.findOne({ where: { name: 'softwood'}});
    const exoticWood = await Type.findOne({ where: { name: 'exotic wood'}});
    const nobleAndHard = await Type.findOne({ where: { name: 'noble and hardwoods'}});

    const tender = await Hardness.findOne({ where: { name: 'tender'}});
    const mediumHard = await Hardness.findOne({ where: { name: 'medium-hard'}});
    const hard = await Hardness.findOne({ where: { name: 'hard'}});

    await queryInterface.bulkInsert(
      "Woods",
      [
        {
          name: "Épicéa",
          typeId: softwood.id,
          hardnessId: tender.id,
        },
        {
          name: "Pin",
          typeId: softwood.id,
          hardnessId: mediumHard.id,
        },
        {
          name: "Padouk",
          typeId: exoticWood.id,
          hardnessId: hard.id,
        },
        {
          name: "Érable",
          typeId: nobleAndHard.id,
          hardnessId: mediumHard.id,
        },
        {
          name: "Hêtre",
          typeId: nobleAndHard.id,
          hardnessId: mediumHard.id,
        },
        {
          name: "Itauba",
          typeId: exoticWood.id,
          hardnessId: hard.id,
        },
        {
          name: "Douglas",
          typeId: softwood.id,
          hardnessId: tender.id,
        }
      ],
      {
        timestamps: true
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Woods", null, {});
  },
};
