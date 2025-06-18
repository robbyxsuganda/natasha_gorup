const { Mahasiswa, Nilai, Mata_Kuliah, sequelize } = require("../models");
class Controller {
  static async create(req, res, next) {
    try {
      const { id_mahasiswa, nama, alamat } = req.body;
      const newMahasiswa = await Mahasiswa.create({
        id_mahasiswa,
        nama,
        alamat,
      });

      res.status(201).json({
        message: "Success Create Mahasiswa",
        newMahasiswa,
      });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;

      const { nama, alamat } = req.body;

      const mahasiswa = await Mahasiswa.findOne({
        where: {
          id_mahasiswa: id,
        },
      });

      if (!mahasiswa) throw { name: "Not Found" };

      const updatedMahasiswa = await mahasiswa.update({ nama, alamat });

      res.status(200).json({
        message: "Success Update Mahasiswa",
        updatedMahasiswa,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const mahasiswa = await Mahasiswa.findOne({
        where: {
          id_mahasiswa: id,
        },
      });

      if (!mahasiswa) throw { name: "Not Found" };

      await mahasiswa.destroy();

      res.status(200).json({
        message: `Success Delete Mahasiswa With Id Mahasiswa ${mahasiswa.id_mahasiswa}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAverageNilai(req, res, next) {
    try {
      const result = await sequelize.query(
        `
        SELECT m.nama as nama_mahasiswa, ROUND(AVG(n.nilai), 2) as nilai_rata_rata
        FROM "Mahasiswas" m
        LEFT JOIN "Nilais" n ON m.id_mahasiswa = n.id_mahasiswa
        GROUP BY m.id_mahasiswa, m.nama
        ORDER BY nama_mahasiswa
      `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );

      result.forEach((element) => {
        if (!element.nilai_rata_rata) {
          element.nilai_rata_rata = "belum ada nilai";
        }
      });

      res.status(200).json({
        message: "Success Get Average Nilai",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
