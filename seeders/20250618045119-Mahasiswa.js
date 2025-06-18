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
      "Mahasiswas",
      [
        {
          id_mahasiswa: "2011501422",
          nama: "Robby Suganda",
          alamat: "Tangerang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_mahasiswa: "2011249123",
          nama: "John Doe",
          alamat: "Bekasi",
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
    await queryInterface.bulkDelete("Mahasiswas", null, {});
  },
};
