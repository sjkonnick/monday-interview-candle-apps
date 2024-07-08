"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Fragrances extends Model {}
  Fragrances.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      category: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Fragrances",
    }
  );
  return Fragrances;
};
