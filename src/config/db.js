import { config } from 'dotenv';
config();

import mysql from 'mysql2/promise';

let connection;

// Create a connection to the database
const connectDB = async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    })
    console.log('MySQL connected...')
    
    // Initialize tables if they don't exist
    await initTables()
  } catch (err) {
    console.error('Database connection failed:', err)
    process.exit(1)
  }
}

const initTables = async () => {
  try {
    // Create users table
   
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS expense_group (
      group_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_by_user_id INT,
        FOREIGN KEY (created_by_user_id) REFERENCES Users(user_id)
      )`
    )

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS expense_group_users (
      group_user_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      group_id INT NOT NULL,
      joined_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id),
      FOREIGN KEY (group_id) REFERENCES expense_group(group_id))
    `);
    
    // Create expenses table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS expenses (
        expense_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        description VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS split_expense (
      split_expense_id INT AUTO_INCREMENT PRIMARY KEY,
      expense_id INT NOT NULL,
      split_by_user_id INT NOT NULL,
      split_amount DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (expense_id) REFERENCES Expenses(expense_id),
      FOREIGN KEY (split_by_user_id) REFERENCES Users(user_id)
);`)

    
    // Create settlements table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS settlements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fromUserId INT NOT NULL,
        toUserId INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'completed') DEFAULT 'pending',
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (fromUserId) REFERENCES users(user_id),
        FOREIGN KEY (toUserId) REFERENCES users(user_id)
      )
    `)
    
    // Create contacts table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    console.log('Tables initialized successfully')
  } catch (err) {
    console.error('Error initializing tables:', err)
  }
}

const getConnection = () => connection

export { connectDB, getConnection }