const express = require('express');
const cors = require('cors'); // Import cors package
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const articlesPath = path.join(__dirname, 'src', 'db', 'articles.json');

// Use cors middleware to allow requests from http://localhost:5173
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// Stream large JSON file with optional query parameters for filtering
app.get('/api/articles', (req, res) => {
    // Read query parameters
    const { year, country, genre, director, actors, title_geo, title_en } = req.query;

    // Create a readable stream
    const readable = fs.createReadStream(articlesPath, { encoding: 'utf8' });

    // Set headers before piping the stream
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Handle errors if the file cannot be read
    readable.on('error', (err) => {
        console.error(`Error reading file: ${err}`);
        res.status(500).json({ error: 'Error reading articles' });
    });

    const filteredArticles = [];

    // Initialize a string to accumulate data chunks
    let data = '';

    // Parse data chunks and filter based on query parameters
    readable.on('data', (chunk) => {
        data += chunk; // Accumulate chunks into data string
    });

    // When all data is read, parse JSON and filter articles
    readable.on('end', () => {
        try {
            const articles = JSON.parse(data); // Parse accumulated data as JSON array

            // Filter articles based on query parameters
            const filtered = articles.filter(article => {
                let match = true;

                // Check each parameter and apply filtering logic
                if (year && article.year !== year) match = false;
                if (country && !article.country.includes(country)) match = false;
                if (genre && !article.genre.includes(genre)) match = false;
                if (director && !article.director.includes(director)) match = false;
                if (actors && !article.actors.some(actor => actor.includes(actors))) match = false;

                // Check title_geo and title_en only if they are defined
                if (title_geo && typeof article.title_geo === 'string' && article.title_geo.toLowerCase().indexOf(title_geo.toLowerCase()) === -1) {
                    match = false;
                }
                if (title_en && typeof article.title_en === 'string' && article.title_en.toLowerCase().indexOf(title_en.toLowerCase()) === -1) {
                    match = false;
                }

                return match;
            });

            filteredArticles.push(...filtered);

            // Send filtered articles as prettied JSON response
            const jsonResponse = JSON.stringify(filteredArticles, null, 2); // 2 spaces indentation for prettifying

            res.send(jsonResponse);
        } catch (err) {
            console.error(`Error parsing JSON: ${err}`);
            res.status(500).json({ error: 'Error parsing articles' });
        }
    });

    // Start reading the stream
    readable.resume();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
