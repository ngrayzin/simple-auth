# web acada simple auth

A full-stack Node.js web application featuring **user registration**, **login**, **username updates**, and **logout** using **PostgreSQL**, **Express**, **Bootstrap**, and **EJS** templating.

---

## Features

### User Registration
- Users can register by providing:
  - Full name
  - Unique username
  - Password
- Validates for **duplicate usernames** in the database.
![image](https://github.com/user-attachments/assets/5f49e4d5-993b-4181-9946-b226571143dc)
![image](https://github.com/user-attachments/assets/e2b5151c-ea84-41e5-9806-9b785f498189)

### Login System
- Users can log in with their credentials.
- Displays error if username/password is incorrect.
- On success, welcomes the user and redirects to a home page.
![image](https://github.com/user-attachments/assets/2ee22690-52df-407e-8e95-646d02f4c8a0)
![image](https://github.com/user-attachments/assets/3d224cae-3b98-4cd2-bfae-3719cd1df27d)


### Update full name
- Users can update their full name from the home page.
- Validates to ensure the new full name is not the same or an empty string.
- Displays inline success/error messages.
![image](https://github.com/user-attachments/assets/c5e51f29-9bc3-4ad9-baf4-83d82d6e9313)
![image](https://github.com/user-attachments/assets/c26688a7-370b-4f8b-aea0-aa70b791bbfc)

### Logout
- Users can safely log out via a POST request.
- Redirects back to the login page.

---

## Db setup
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
---


