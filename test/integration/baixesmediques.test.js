const { expect } = require("chai");
const request = require("supertest");

const app = require("../../app.js");

describe("Proves de integració per al controlador de baixes mediques", () => {
	describe("GET /baixesmediques", () => {
		it("Tindria que retornar codi de estat 302.", async () => {
			const response = await request(app).get("/baixesmediques");
			expect(response.status).to.equal(302);
		});
	});
});
