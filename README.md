
# To-Do App by Khalil Ahmed

A simple To-Do application built with Node.js, Express.js, EJS, and Bootstrap. The app allows users to register, log in, and manage their tasks with features such as adding, editing, completing, and deleting To-Dos. The data is stored in a MySQL database.

## Features

- User registration and login
- Add, edit, complete, and delete To-Dos
- View To-Dos with date and time
- Responsive UI with Bootstrap


### Prerequisites

- Node.js
- MySQL

### Install dependencies:

   ```bash
   npm install
   ```

### Set up the database:

   - Create a MySQL database and import the provided schema:
   
     ```sql
     CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL
     );

     CREATE TABLE todos (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT,
       text TEXT,
       date_time DATETIME,
       is_complete BOOLEAN DEFAULT FALSE,
       FOREIGN KEY (user_id) REFERENCES users(id)
     );
     ```


## Usage

- **Home Page:** Provides options to register and log in.
- **Register:** Create a new user account.
- **Login:** Access your To-Do list.
- **To-Do List:** Add, edit, mark as complete, and delete tasks.
