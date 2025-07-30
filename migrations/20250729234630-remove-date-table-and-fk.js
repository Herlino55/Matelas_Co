'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Retirer les clés étrangères liées à la table Date
    // Exemple : si une table Matelas avait une foreign key "dateId"
    // await queryInterface.removeColumn('Matelas', 'dateId');

    await queryInterface.removeColumn('Boissons', 'dateId');

    await queryInterface.removeColumn('Transactions', 'dateId');

    // Supprimer la table "Date"
    await queryInterface.dropTable('Dates');
  },

  async down(queryInterface, Sequelize) {
    // En cas de rollback, on recrée la table Date et les colonnes supprimées

    await queryInterface.createTable('Dates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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

    await queryInterface.addColumn('Matelas', 'dateId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Dates',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('Boisson', 'dateId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Dates',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('Transaction', 'dateId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Dates',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
