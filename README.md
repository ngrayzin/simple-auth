# 🛡️ User Authentication App with PostgreSQL & Express

A full-stack Node.js web application featuring **user registration**, **login**, **username updates**, and **logout** using **PostgreSQL**, **Express**, **Bootstrap**, and **EJS** templating.

---

## Features

### User Registration
- Users can register by providing:
  - Full name
  - Unique username
  - Password
- Validates for **duplicate usernames** in the database.

### Login System
- Users can log in with their credentials.
- Displays error if username/password is incorrect.
- On success, welcomes the user and redirects to a home page.

### Update full name
- Users can update their full name from the home page.
- Validates to ensure the new username is not already taken.
- Displays inline success/error messages.

### Logout
- Users can safely log out via a POST request.
- Redirects back to the login page.

---

## Db setup
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---


