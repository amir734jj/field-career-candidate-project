import request from "supertest";
import app from "../../src/app";

describe("GET /statistics", () => {
    it("should return 200 OK", (done) => {
	    // Arrange, Act, Assert
	    request(app).get("/statistics")
            .expect(200, done);
    });
});
