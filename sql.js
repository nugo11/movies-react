const fs = require('fs-extra');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '195.54.178.5',
    user: 'didgoril_mov',
    password: 'Leopardi.1234',
    database: 'didgoril_mov'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ', connection.threadId);

    // Path to your JSON file
    const jsonFilePath = './src/db/mov/articles.json';

    // Read JSON file
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file: ', err);
            return;
        }

        try {
            // Parse JSON data
            const jsonData = JSON.parse(data);

            // Insert data into MySQL
            const tableName = 'your_table'; // Replace with your table name
            const sql = `INSERT INTO ${tableName} SET ?`;

            let count = 0;
            jsonData.forEach(item => {
                connection.query(sql, item, (err, results) => {
                    if (err) {
                        console.error('Error inserting into MySQL: ', err);
                        return;
                    }
                    console.log('Inserted row:', results.insertId);
                    count++;

                    // Close connection after all queries are executed
                    if (count === jsonData.length) {
                        connection.end();
                    }
                });
            });

        } catch (err) {
            console.error('Error parsing JSON: ', err);
        }
    });
});
