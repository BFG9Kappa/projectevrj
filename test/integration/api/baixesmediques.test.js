const { expect } = require("chai");
const request = require("supertest");

const app = require("../../../app.js");

describe("Proves de integració per al controlador API de baixes mediques", () => {
	describe("GET /api/baixesmediques", () => {
		it("Tindria que retornar codi de estat 200.", async () => {
			const response = await request(app).get("/api/baixesmediques");
			expect(response.status).to.equal(200);
		});
	});
});
