const { expect } = require("chai");
const request = require("supertest");

const app = require("../../../app.js");

describe("Proves de integració per al controlador de sortides curriculars", () => {
	describe("GET /api/sortidescurriculars", () => {
		it("Tindria que retornar codi de estat 200.", async () => {
			const response = await request(app).get("/api/sortidescurriculars");
			expect(response.status).to.equal(200);
		});
	});
});
