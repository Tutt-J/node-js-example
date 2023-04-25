'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hardness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hardness.hasMany(models.Wood, {
        foreignKey: "hardnessId",
        as: "woods",
      });
    }
  }
  Hardness.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hardness',
  });
  return Hardness;
};