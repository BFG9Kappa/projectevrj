const { expect } = require("chai");
const request = require("supertest");

const app = require("../../app.js");

describe("Proves de integració per al controlador de sortides curriculars", () => {
	describe("GET /sortidescurriculars", () => {
		it("Tindria que retornar codi de estat 302.", async () => {
			const response = await request(app).get("/sortidescurriculars");
			expect(response.status).to.equal(302);
		});
	});
});
