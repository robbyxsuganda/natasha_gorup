"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Mata_Kuliahs",
      [
        {
          id_mata_kuliah: "MK-001",
          nama_matkul: "Algoritma",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_mata_kuliah: "MK-002",
          nama_matkul: "Database",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Mata_Kuliahs", null, {});
  },
};
