"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mahasiswa.hasMany(models.Nilai, { foreignKey: "id_mahasiswa" });
    }
  }
  Mahasiswa.init(
    {
      id_mahasiswa: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "ID Mahasiswa Required",
          },
          notNull: {
            msg: "ID Mahasiswa Required",
          },
          len: {
            args: [10, 10],
            msg: "ID Mahasiswa harus terdiri dari 10 karakter",
          },
        },
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name Required",
          },
          notNull: {
            msg: "Name Required",
          },
        },
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Alamat Required",
          },
          notNull: {
            msg: "Alamat Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Mahasiswa",
    }
  );

  //! Gunakan ini jika tidak ingin user menginputkan id_mahasiswa
  // Mahasiswa.beforeCreate((mhs) => {
  //   const timestamp = Date.now().toString();
  //   mhs.id_mahasiswa = timestamp.slice(-10);
  // });

  // Menambahkan hooks untuk menghapus data nilai terkait sebelum menghapus mahasiswa
  Mahasiswa.beforeDestroy(async (mahasiswa, options) => {
    const { Nilai } = sequelize.models;
    await Nilai.destroy({
      where: {
        id_mahasiswa: mahasiswa.id_mahasiswa,
      },
      ...options,
    });
  });

  return Mahasiswa;
};
