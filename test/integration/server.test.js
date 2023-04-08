const expect = require("chai").expect;
const request = require("request");

describe("Servidor funciona correctament", function () {
	it("Tindria que tornar un missatge de benvinguda.", function (done) {
		request("http://localhost:5000/test", function (error, response, body) {
			expect(body).to.equal("Prova de servidor");
			done();
		});
	});
});
