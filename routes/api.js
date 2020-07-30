var express = require("express");
var router = express.Router();
var mysql = require("mysql");

// set up connection to mysql database.
const connection = mysql.createConnection({
  host: "SG-HRApplicationDB-2789-master.servers.mongodirector.com",
  user: "JustinBresee",
  password: "37Rigger909!",
  database: "HR-App",
});

connection.connect();
connection.on("connect", () => console.log("conneced to database"));

/* GET home page. */
router.get("/", function (req, res) {
  var list = ["item1", "item2", "item3"];
  res.json(list);
});

// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);

// query for inserting a new team member
// `insert into TeamMembers (Name, Address, Email, Preferred_Phone, Position, Department, Start_Date, End_Date, Employment_Status, Shift, Manager, Team_Member_Photo, Favorite_Color) values("Justin Bresee","Roy, UT","justinbresee@gmail.com","817-555-5555","IT Manager","IT",null,null,"employed","All Day","Tom",null,"Blue")`

// query to update a row
// `update TeamMembers set Start_Date = "2015-03-03" where Name = "Justin Bresee"`

// query to delete a row
// DELETE FROM TeamMembers WHERE Name = "Justin Bresee";

// GET - all team members
router.get("/team-members", function (req, res) {
  connection.query(`SELECT Name, Address, Email, Member_ID, Preferred_Phone,Department, Position, Employment_Status, DATE_FORMAT(Start_Date, "%b %Y") as Start_Date, DATE_FORMAT(End_Date, "%b %Y") as End_Date, Shift, Manager, Team_Member_Photo, Favorite_Color, Permissions FROM TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// GET - all team managers
router.get("/team-members/managers", function (req, res) {
  connection.query(`SELECT Name, Address, Email, Preferred_Phone, Member_ID, Department, Position, Employment_Status, DATE_FORMAT(Start_Date, "%b %Y") as Start_Date, DATE_FORMAT(End_Date, "%b %Y") as End_Date,Shift, Manager, Team_Member_Photo, Favorite_Color, Permissions FROM TeamMembers WHERE (Position = "Department Manager" OR Position = "CEO") AND  Employment_Status="Employed"`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// GET - all team managers
router.get("/departments", function (req, res) {
  connection.query(`SELECT Distinct Department FROM TeamMembers`, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

// POST - Add a new team member
router.post("/team-members/add", function (req, res) {
  const {
    name,
    address,
    email,
    preferredPhone,
    position,
    department,
    startDate,
    endDate,
    employmentStatus,
    shift,
    manager,
    photo,
    favoriteColor,
    permissions,
  } = req.body;

  let member_ID = 0;
  connection.query(
    "SELECT Member_ID FROM TeamMembers ORDER BY Member_ID DESC LIMIT 1",
    (error, results) => {
      if (error) throw error;
      // takes highest current ID and creates new ID by incrementing +1
      member_ID = (results[0].Member_ID + 1);

      connection.query(
        `INSERT INTO TeamMembers (Name, Address, Email, Preferred_Phone, Position, Department, Start_Date, End_Date, Employment_Status, Shift, Manager, Team_Member_Photo, Favorite_Color, Permissions, Member_ID) VALUES (${name ? '"' + name + '"' : null},${address ? '"' + address + '"' : null},${email ? '"' + email + '"' : null},${preferredPhone ? '"' + preferredPhone + '"' : null},${position ? '"' + position + '"' : null},${department ? '"' + department + '"' : null},${startDate ? '"' + startDate + '"' : null},${endDate ? '"' + endDate + '"' : null},${employmentStatus ? '"' + employmentStatus + '"' : null},${shift ? '"' + shift + '"' : null},${manager ? '"' + manager + '"' : null},${photo ? '"' + photo + '"' : null},${favoriteColor ? '"' + favoriteColor + '"' : null}, ${permissions ? '"' + permissions + '"' : null}, ${member_ID})`,
        function (error, results) {
          if (error) throw error;
          res.json(results);
        }
      );
    }
  );
});

// POST - Edit a team member
router.post("/team-members/edit", function (req, res) {
    const {
      name,
      address,
      email,
      preferredPhone,
      position,
      department,
      startDate,
      endDate,
      employmentStatus,
      shift,
      manager,
      photo,
      favoriteColor,
      permissions,
      member_ID
    } = req.body;
    
    // take params passed in a prepare to be passed into query
    let params = `${name ? 'Name = ' + '"' + name + '"' : ""} ${address ? ', Address = ' + '"' + address + '"' : ""} ${email ? ', Email = ' + '"' + email + '"' : ""} ${preferredPhone ? ', Preferred_Phone = ' + '"' + preferredPhone + '"' : ""} ${position ? ', Position = ' + '"' + position + '"' : ""} ${department ? ', Department = ' + '"' + department + '"' : ""} ${startDate ? ', Start_Date = ' + '"' + startDate + '"' : ""} ${endDate ? ', End_Date = ' + '"' + endDate + '"' : ""} ${employmentStatus ? ', Employment_Status = ' + '"' + employmentStatus + '"' : ""} ${shift ? ', Shift = ' + '"' + shift + '"' : ""} ${manager ? ', Manager = ' + '"' + manager + '"' : ""} ${photo ? ', Team_Member_Photo = ' + '"' + photo + '"' : ""} ${favoriteColor ? ', Favorite_Color = ' + '"' + favoriteColor + '"' : ""} ${permissions ? ', Permissions = ' + '"' + permissions + '"' : ""}`;
    params = params.trim();
    if(params[0] === ",")  params = params.substring(1);
  
    connection.query(`UPDATE TeamMembers SET ${params} WHERE Member_ID = ${member_ID}`, 
    (error,results) => {
        if (error) throw error;
        res.json(results);
    });
});

// POST - Remove a team member by ID
router.delete("/team-members/remove", function (req, res) {
  const {member_ID} = req.body;
  connection.query(`DELETE FROM TeamMembers WHERE Member_ID = ${member_ID}`, 
  (error,results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET - all activity logs
router.get("/activity-log", function (req, res) {
  connection.query(`SELECT Name, Activity_Type, Changed_From, Changed_To ,DATE_FORMAT(Activity_Date, "%b %Y") as Activity_Date FROM ActivityLog ORDER BY Activity_Date DESC;`, 
  (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// POST - add new activity to logs
router.post("/activity-log/add", (req, res) => {
  const {
    member_ID,
    name,
    activityDate,
    activityType,
    changedFrom,
    changedTo
  } = req.body;
  connection.query(`INSERT INTO ActivityLog (Member_ID,Name,Activity_Date, Activity_Type, Changed_From, Changed_To) VALUES (${member_ID ? '"' + member_ID + '"' : null},${name ? '"' + name + '"' : null},${activityDate ? '"' + activityDate + '"' : null}, ${activityType ? '"' + activityType + '"' : null}, ${changedFrom ? '"' + changedFrom + '"' : null}, ${changedTo ? '"' + changedTo + '"' : null})`, 
  (error,results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET - recruiting metrics
router.get("/recruiting-metrics", (req, res) => {
  if(!req.query.operation || !req.query.field) res.sendStatus(404);
  const {operation, field, year} = req.query;
  connection.query(`SELECT ${operation}(rm.${field}) as "metric" FROM RecruitingMetrics as rm JOIN TeamMembers as tm on tm.Member_ID = rm.Member_ID ${year ? `WHERE YEAR(tm.Start_Date) = "${year}"`: ""}`, 
  (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET - Hire Experiences Grouped By Hire Experience
router.get("/recruiting-metrics/hire-experiences", (req, res) => {
  connection.query(`SELECT Hire_Experience, COUNT(Member_ID) as "count" FROM RecruitingMetrics GROUP BY Hire_Experience;`, 
  (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET - Hire Source Grouped By Source
router.get("/recruiting-metrics/hire-sources", (req, res) => {
  connection.query(`SELECT Hire_Source, COUNT(Member_ID) as "count" FROM RecruitingMetrics GROUP BY Hire_Source;`, 
  (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// POST - add new recruiting metric
router.post("/recruiting-metrics/add", (req, res) => {
  const {
    member_ID,
    hireCost,
    hireExperience,
    hireSource,
    daysToHire
  } = req.body;
  connection.query(`INSERT INTO RecruitingMetrics (Member_ID, Hire_cost, Hire_Experience, Hire_Source, Days_To_Hire) VALUES (${member_ID ? '"' + member_ID + '"' : null}, ${hireCost ? '"' + hireCost + '"' : null}, ${hireExperience ? '"' + hireExperience + '"' : null}, ${hireSource ? '"' + hireSource+ '"' : null}, ${daysToHire ? '"' + daysToHire + '"' : null});`, 
  (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET - number of new employees hired in last week
router.get("/recruiting-metrics/past-week-hires", (req, res) => {
  connection.query(`SELECT COUNT(*) as "total_hires" FROM TeamMembers WHERE Start_Date >= NOW() - INTERVAL 7 DAY;`, 
  (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET - number employees terminated this year
router.get("/recruiting-metrics/past-year-terminated", (req, res) => {
  connection.query(`SELECT COUNT(*) as "total_terminated" FROM TeamMembers WHERE YEAR(End_Date) >= YEAR(NOW());`, 
  (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET - number employees terminated each year
router.get("/recruiting-metrics/terminated_by_year", (req, res) => {
  connection.query(`SELECT YEAR(End_Date) as "year",COUNT(Member_ID) as "total_terminated" FROM TeamMembers WHERE Employment_Status = "terminated" GROUP BY YEAR(End_Date)`, 
  (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET - average hire cost for this current year
router.get("/recruiting-metrics/average-hire-cost", (req, res) => {
  connection.query(`SELECT ROUND(AVG(rm.Hire_Cost), 2) as "hire_cost" FROM RecruitingMetrics as rm JOIN TeamMembers as tm ON rm.Member_ID = tm.Member_ID WHERE YEAR(tm.Start_Date) = YEAR(CURDATE());`, 
  (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET - overall retention metrics
router.get("/retention-metrics", (req, res ) => {
  if (!req.query.year) res.sendStatus(404);
  const { year, department } = req.query;
  const totalEndYear = `SELECT COUNT(Member_ID) from TeamMembers WHERE (Start_Date <= "${year}-01-01" AND Member_ID IN (SELECT Member_ID FROM TeamMembers WHERE End_Date > "${year}-12-31" OR End_Date IS NULL)) ${department ? 'AND Department = "' + department + '"' : ""}`;
  const totalBeginningYear = `SELECT COUNT(Member_ID) from TeamMembers WHERE (Start_Date <= "${year}-01-01" AND (End_Date > "${year}-01-01" OR End_Date IS NULL)) ${department ? 'AND Department = "' + department + '"' : ""}`;
  connection.query(`SELECT ROUND((${totalEndYear}) / (${totalBeginningYear}) * 100, 2) as "retentionRate";`, 
  (error,results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET - team member permissions
router.get("/team-members/permissions", (req, res ) => {
  connection.query(`select Name, Member_ID, Permissions from TeamMembers ORDER BY Permissions DESC`,
  (error,results) => {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = router;
