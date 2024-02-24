import db from "../config/dbconfig.js";

// Function to check if a user with the given username already exists
function checkUserExists(username, callback) {
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (error, results, fields) => {
    if (error) {
      console.error("An error occurred while executing the query:", error);
      callback(error, null);
      return;
    }
    callback(null, results.length > 0);
  });
}

// Function to insert a new user into the database
function createUser(username, password, callback) {
  checkUserExists(username, (error, userExists) => {
    if (error) {
      callback(
        { error: "An error occurred while checking user existence" },
        null
      );
      return;
    }
    if (userExists) {
      callback({ error: "Account already exists" }, null);
      return;
    }
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, password], (error, results, fields) => {
      if (error) {
        console.error("An error occurred while executing the query:", error);
        callback({ error: "An error occurred while inserting the user" }, null);
        return;
      }
      callback(null, results);
    });
  });
}

export { createUser };
