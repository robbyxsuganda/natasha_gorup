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
    await queryInterface.bulkInsert("Nilais", [
      {
        id_mahasiswa: "2011501422",
        id_matkul: "MK-001",
        nilai: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_mahasiswa: "2011501422",
        id_matkul: "MK-002",
        nilai: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_mahasiswa: "2011249123",
        id_matkul: "MK-001",
        nilai: 70,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_mahasiswa: "2011249123",
        id_matkul: "MK-002",
        nilai: 88,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Nilais", null, {});
  },
};
