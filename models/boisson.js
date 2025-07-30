'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boisson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Boisson.init({
    categorie: DataTypes.STRING,
    nom: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    qte: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Boisson',
  });
  return Boisson;
};