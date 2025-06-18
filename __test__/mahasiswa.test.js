const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert(
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

  await sequelize.queryInterface.bulkInsert(
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

  await sequelize.queryInterface.bulkInsert("Nilais", [
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
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Mahasiswas", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Mata_Kuliahs", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Nilais", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /mahasiswa", () => {
  describe("POST /mahasiswa - succeed", () => {
    it("should be return an object with message", async () => {
      const body = {
        id_mahasiswa: "1234567890",
        nama: "test",
        alamat: "alamat test",
      };
      const response = await request(app).post("/mahasiswa").send(body);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
      expect(response.body).toHaveProperty("newMahasiswa", expect.any(Object));
    });
  });

  describe("POST /mahasiswa - fail", () => {
    // error karna req body tidak sesuai
    it("should be return an object with error message", async () => {
      const body = {
        id_mahasiswa: "1234567890",
        nama: "",
        alamat: "alamat test",
      };
      const response = await request(app).post("/mahasiswa").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error karna unique
    it("should be return an object with error message", async () => {
      const body = {
        id_mahasiswa: "1234567890",
        nama: "test",
        alamat: "alamat test",
      };
      const response = await request(app).post("/mahasiswa").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("PUT /mahasiswa", () => {
  describe("PUT /mahasiswa/:id - succeed", () => {
    it("should be return an object with message", async () => {
      const body = {
        nama: "test ganti",
        alamat: "alamat test",
      };
      const response = await request(app)
        .put("/mahasiswa/2011501422")
        .send(body);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
      expect(response.body).toHaveProperty(
        "updatedMahasiswa",
        expect.any(Object)
      );
    });
  });

  describe("PUT /mahasiswa/:id - fail", () => {
    // error karna req body tidak sesuai
    it("should be return an object with error message", async () => {
      const body = {
        nama: "",
        alamat: "alamat test",
      };
      const response = await request(app)
        .put("/mahasiswa/2011501422")
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error karna not found
    it("should be return an object with error message", async () => {
      const body = {
        nama: "test",
        alamat: "alamat test",
      };
      const response = await request(app).put("/mahasiswa/1000").send(body);

      expect(response.status).toBe(500);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("DELETE /mahasiswa/:id", () => {
  describe("DELETE /mahasiswa/:id - succeed", () => {
    it("should be return an object with message", async () => {
      // await sequelize.query(
      //   "DELETE FROM Nilais WHERE id_mahasiswa = '2011249123'"
      // );

      const response = await request(app).delete("/mahasiswa/2011249123");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("DELETE /mahasiswa/:id - fail", () => {
    // error karna id tidak valid
    it("should be return an object with error message", async () => {
      const response = await request(app).delete("/mahasiswa/1000");

      expect(response.status).toBe(500);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("GET /mahasiswa", () => {
  describe("GET /mahasiswa - succeed", () => {
    it("should be return an object with message", async () => {
      const response = await request(app).get("/mahasiswa");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
      expect(response.body).toHaveProperty("data", expect.any(Array));
    });
  });
});
