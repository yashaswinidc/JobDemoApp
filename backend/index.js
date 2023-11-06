var express = require("express");
var mysql = require("mysql");
var connection = require("./database");

var cors = require("cors");

var app = express();
app.use(cors());
app.use(express.json());

//Adding registration data to db.
app.post("/signup", function (req, res) {
  // Check if user exists - considering EmailId as primary key
  const sql_query1 = "SELECT * FROM register WHERE `email_id` = ?";
  // console.log(req.body.emailId);
  connection.query(sql_query1, [req.body.emailId], (err, data) => {
    if (err) {
      return res.json("Error", err);
    }

    if (data.length > 0) return res.json("User already exists - Please login");
    else {
      const sql_query =
        "INSERT INTO register (`username`, `dateOfBirth`, `email_id`, `phoneNo`, `address`, `password`, `gender`) VALUES " +
        "(" +
        `'${req.body.username}'` +
        "," +
        `'${req.body.dateOfBirth}'` +
        "," +
        `'${req.body.emailId}'` +
        "," +
        `'${req.body.phoneNo}'` +
        "," +
        `'${req.body.address}'` +
        "," +
        `'${req.body.password}'` +
        "," +
        `'${req.body.gender}'` +
        ")";

      connection.query(sql_query, function (err, results) {
        if (err) throw err;
        res.send(results);
      });
    }
  });
});

app.post("/resetPassword", (req, res) => {
  const sql_query = "SELECT * FROM register WHERE `email_id` = ? ";

  connection.query(sql_query, [req.body.emailId], (err, data) => {
    if (err) {
      return res.json({ error: err });
    }

    if (data.length > 0) {
      // SQL query to update the user's password
      const sqlQuery = "UPDATE register SET password = ? WHERE email_id = ? ";
      connection.query(
        sqlQuery,
        [req.body.password, req.body.emailId],
        (err, result) => {
          if (err) {
            return res.json({ error: err });
          } else {
            return res.json("Password updated successfully!");
          }
        }
      );
    } else {
      return res.json(
        "User doesn't exist with this email ID. Check the input or register as a new user."
      );
    }
  });
});

app.get("/signup", (req, res) => {
  let sql = "SELECT * FROM register";
  console.log(req.body.currentPage);
  connection.query(sql, function (err, results) {
    //console.log("hi",res);
    if (err) throw err;
    res.send(results);
  });
});

app.post("/login", (req, res) => {
  const sql_query =
    "SELECT user_id FROM register WHERE `email_id` = ? AND `password` = ?";

  connection.query(
    sql_query,
    [req.body.email, req.body.password],
    (err, data) => {
      if (err) {
        return res.json("Error", err);
      }

      if (data.length > 0) {
        const user_id = data[0].user_id;
        return res.json({ status: "success", user_id });
      } else {
        return res.json({ status: "failed" });
      }
    }
  );
});

// app.post("/login", (req, res) => {
//   console.log(req.body);
//   const sql_query =
//     "INSERT INTO demo (`user_id`,`login_date`,`login_time`) VALUES " +
//     "(" +
//     `'1'` +
//     "," +
//     `'2023-11-02'` +
//     "," +
//     `'10:05:00'` +
//     // `'${req.body.login_date}'` +
//     // `'${req.body.login_time}'` +
//     ")";
//   // const sql_query = "SELECT * FROM demo";
//   connection.query(sql_query, function (err, data) {
//     if (err) {
//       return res.json("Error", err);
//     }
//     //console.log(`${req.body.email}`,`${req.body.password}`);
//     if (data.length > 0) {
//       return res.json(data);
//     } else return res.json("failed");
//   });
// });

app.get("/dashboard", (req, res) => {
  const query = "SELECT * FROM jobs";
  connection.query(query, function (err, results) {
    //console.log("hi",res);
    if (err) throw err;
    res.send(results);
  });
});

app.get("/profile/:userId", (req, res) => {
  const userId = req.params.userId;

  const userQuery = `SELECT * FROM register WHERE user_id = ${userId}`;
  connection.query(userQuery, function (err, userResult) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching user data" });
      return;
    }

    if (userResult.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = userResult[0];
    const user_profile_id = user.profile_id;

    // Fetch user profile data from the 'candidate_profile' table
    const profileQuery = `SELECT * FROM candidate_profile WHERE profile_id = ${user_profile_id}`;
    connection.query(profileQuery, function (err, profileResult) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching profile data" });
        return;
      }

      // Fetch education history for the user
      const educationQuery = `SELECT * FROM education_history WHERE profile_id = ${user_profile_id}`;
      connection.query(educationQuery, function (err, educationResult) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error fetching education history" });
          return;
        }

        // Fetch work history for the user
        const workQuery = `SELECT * FROM work_history WHERE profile_id = ${user_profile_id}`;
        connection.query(workQuery, function (err, workResult) {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Error fetching work history" });
            return;
          }

          //Fetch Project details for the user
          const projectQuery = `SELECT * FROM projects WHERE profile_id = ${user_profile_id}`;
          connection.query(projectQuery, function (err, projectResult) {
            if (err) {
              console.error(err);
              res.status(500).json({ error: "Error fetching work history" });
              return;
            }

            // Combine the results
            const userData = user;
            const profileData = profileResult[0];
            const educationData = educationResult;
            const workData = workResult;
            const projectData = projectResult;

            // Send the data as JSON
            res.json({
              userData,
              profileData,
              educationData,
              workData,
              projectData,
            });
          });
        });
      });
    });
  });
});

app.post("/profile/:profileId", (req, res) => {
  const profile_id = req.params.profileId;
  console.log("Profile id", req.body);
  const newSummary = req.body.newSummary;
  const query = `UPDATE candidate_profile SET summary = '${newSummary}' WHERE profile_id = ${profile_id}`;
  connection.query(query, function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update summary" });
    } else {
      res.json({ message: "Summary updated successfully" });
    }
  });
});

app.listen(3001, function () {
  console.log("App listening on port 3001");

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database.");
  });
});
