"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Nilais", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_mahasiswa: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Mahasiswas",
          key: "id_mahasiswa",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      id_matkul: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Mata_Kuliahs",
          key: "id_mata_kuliah",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      nilai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Nilais");
  },
};
