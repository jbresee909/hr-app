var express = require("express");
var router = express.Router();
var mysql = require("mysql");

// set up connection to mysql database
const connection = mysql.createConnection({
  host: "SG-HRApplicationDB-2789-master.servers.mongodirector.com",
  user: "JustinBresee",
  password: "37Rigger909!",
  database: "HR-App",
});

connection.connect();
connection.on("connect", () => console.log("conneced to database"));

/* GET home page. */
router.get("/", function (req, res, next) {
  connection.query(`select Name from TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// query for inserting a new team member
// `insert into TeamMembers (Name, Address, Email, Preferred_Phone, Position, Department, Start_Date, End_Date, Employment_Status, Shift, Manager, Team_Member_Photo, Favorite_Color) values("Justin Bresee","Roy, UT","justinbresee@gmail.com","817-555-5555","IT Manager","IT",null,null,"employed","All Day","Tom",null,"Blue")`

// query to update a row
// `update TeamMembers set Start_Date = "2015-03-03" where Name = "Justin Bresee"`

// query to delete a row
// DELETE FROM TeamMembers WHERE Name = "Justin Bresee";

// GET - all team members
router.get("/team-members", function (req, res, next) {
  connection.query(`select * from TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// POST - Add a new team member
router.post("/team-members/add", function (req, res, next) {
  connection.query(`select * from TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// POST - Edit a team member
router.post("/team-members/edit", function (req, res, next) {
  connection.query(`select * from TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// POST - Remove a team member
router.post("/team-members/remove", function (req, res, next) {
  connection.query(`select * from TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// GET - all activity logs
router.get("/activity-logs", function (req, res, next) {
  connection.query(`select * from TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// POST - add new activity to logs
router.post("/activity-logs/add", function (req, res, next) {
  connection.query(`select * from TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// GET - recruiting metrics
router.get("/recruiting-metrics", function (req, res, next) {
  connection.query(`select * from TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// GET - retention metrics
router.get("/retention-metrics", function (req, res, next) {
  connection.query(`select * from TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// GET - team member permissions
router.get("/team-members/permissions", function (req, res, next) {
  connection.query(`select * from TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = router;
