const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = 5000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// SQL Server Configuration (SQL Server Authentication)
const config = {
    user: 'testuser', //  Replace with your SQL Server username
    password: 'Admindev@123', //  Replace with your password
    server: 'BHARATHPC\\ERP_DEV_2025', //  Remove \SQLEXPRESS if not needed
    database: 'myappdb',
    options: {
      
      encrypt: false, // Set to true only for Azure SQL
      trustServerCertificate: true
    },
    port: 1433 //  Ensure SQL Server uses this port
  };

//  Get all users
app.get('/api/users', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query('SELECT * FROM users');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Database error: ' + err.message);
  }
});

//  Add a new user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    let pool = await sql.connect(config);
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .query('INSERT INTO users (name, email) VALUES (@name, @email)');
    res.status(201).send('User added');
  } catch (err) {
    res.status(500).send('Database error: ' + err.message);
  }
});

//  Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
