'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Matelas.init({
    nom: DataTypes.STRING,
    longueur: DataTypes.FLOAT,
    largeur: DataTypes.FLOAT,
    epaisseur: DataTypes.FLOAT,
    prix: DataTypes.FLOAT,
    type: DataTypes.STRING,
    qte: DataTypes.INTEGER,
    photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Matelas',
  });
  return Matelas;
};