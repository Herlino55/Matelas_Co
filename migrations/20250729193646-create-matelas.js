'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matelas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      longueur: {
        type: Sequelize.FLOAT
      },
      largeur: {
        type: Sequelize.FLOAT
      },
      epaisseur: {
        type: Sequelize.FLOAT
      },
      prix: {
        type: Sequelize.FLOAT
      },
      type: {
        type: Sequelize.STRING
      },
      qte: {
        type: Sequelize.INTEGER
      },
      photo: {
        type: Sequelize.STRING
      },
      dateId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Matelas');
  }
};