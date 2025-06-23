const express = require("express");
require("dotenv").config();
const { Pool } = require("pg");
const app = express();
const PORT = 3000;

var isLoggedIn = false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.set("view engine", "ejs");

// ------ ROUTES
app.get("/", (req, res) => {
  if (isLoggedIn) {
    return res.redirect("/home");
  } else {
    return res.redirect("/login");
  }
});

app.get("/home", (req, res) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/home");
  } else {
    return res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.render("login", {
    error: null,
    old: {},
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    error: null,
    old: {},
  });
});

app.post("/register", async (req, res) => {
  const { username, password, full_name } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      // Username already taken
      return res.status(400).render("register", {
        error: "Username already exists. Please choose another.",
        old: { username, full_name },
      });
    }

    // Proceed with registration
    const query = `INSERT INTO users (username, password, full_name) VALUES ($1, $2, $3) RETURNING full_name`;
    const values = [username, password, full_name];
    const result = await pool.query(query, values);

    // Redirect to home or success page
    res.render("home", {
      username: result.rows[0].full_name,
      error: null,
      success: null,
    });
    isLoggedIn = true;
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).render("register", {
      error: "Something went wrong. Please try again later.",
      old: { username, full_name },
    });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      // Login success
      res.render("home", {
        username: result.rows[0].full_name,
        error: null,
        success: null,
      });
      isLoggedIn = true;
    } else {
      // Invalid credentials
      res.status(401).render("login", {
        error: "Invalid username or password.",
        old: { username },
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).render("login", {
      error: "An unexpected error occurred. Please try again.",
      old: { username },
    });
  }
});

app.post("/update-fullname", async (req, res) => {
  const { old_fullname, new_fullname } = req.body;

  if (old_fullname === new_fullname || new_fullname === "") {
    return res.render("home", {
      username: old_fullname,
      error: "Invalid full name.",
      success: null,
    });
  }

  try {
    // Update full name
    await pool.query("UPDATE users SET full_name = $1 WHERE full_name = $2", [
      new_fullname,
      old_fullname,
    ]);

    return res.render("home", {
      username: new_fullname,
      success: "Full name successfully updated.",
      error: null,
    });
  } catch (err) {
    console.error("Error updating full name:", err);
    return res.status(500).render("home", {
      username: old_fullname,
      error: "Something went wrong while updating full name.",
      success: null,
    });
  }
});

app.get("/home", (req, res) => {
  if (!isLoggedIn) {
    return res.redirect("/login");
  }
  res.render("home", {
    username: "User",
    error: null,
    success: null,
  });
});

app.post("/logout", (req, res) => {
  isLoggedIn = false;
  res.redirect("login");
});

// -------- Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
