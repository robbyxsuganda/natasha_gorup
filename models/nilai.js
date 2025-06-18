"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nilai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nilai.belongsTo(models.Mahasiswa, { foreignKey: "id_mahasiswa" });
      Nilai.belongsTo(models.Mata_Kuliah, { foreignKey: "id_matkul" });
    }
  }
  Nilai.init(
    {
      id_mahasiswa: DataTypes.INTEGER,
      id_matkul: DataTypes.INTEGER,
      nilai: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Nilai",
    }
  );
  return Nilai;
};
