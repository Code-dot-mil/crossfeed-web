var chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

var app = require("../server");

describe("Server", () => {
  describe("GET /", () => {
    it("should respond 401 when unauthenticated", done => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it("should respond 200 when authenticated", done => {
      chai
        .request(app)
        .get("/")
        .auth("admin", process.env.APP_PASSWORD)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("POST /api/domains/search", () => {
    it("should return domains", done => {
      chai
        .request(app)
        .post("/api/domains/search")
        .auth("admin", process.env.APP_PASSWORD)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("GET /api/scans/logs", () => {
    it("should return logs", done => {
      chai
        .request(app)
        .get("/api/scans/logs")
        .auth("admin", process.env.APP_PASSWORD)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("GET /api/scans/configure", () => {
    it("should return scheduled cron jobs", done => {
      chai
        .request(app)
        .get("/api/scans/configure")
        .auth("admin", process.env.APP_PASSWORD)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("POST /api/scans/launch/preview", () => {
    it("should allow previewing a scan", done => {
      chai
        .request(app)
        .post("/api/scans/launch/preview")
        .send({ filters: { ports: ["80"], services: ["PHP"] } })
        .auth("admin", process.env.APP_PASSWORD)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
