const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

// Connection URL and Database Name
const url =
  "mongodb+srv://nugoxucishvili:Leopardi.123@cluster0.vwluwpc.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "movies";

// Middleware to handle query parameters
app.use((req, res, next) => {
  const query = { ...req.query };
  Object.keys(query).forEach((key) => {
    if (Array.isArray(req.query[key])) {
    } else if (typeof req.query[key] === "string") {
      req.query[key] = [req.query[key]];
    }
  });
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Route to get articles with cursor-based pagination
app.get("/api/articles", async (req, res) => {
  const {
    year_from,
    year_to,
    imdb_from,
    imdb_to,
    country,
    director,
    actors,
    title_geo,
    title_en,
    page = 1,
    limit = 2,
  } = req.query;

  const { genre } = req.query;

  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database and collection
    const db = client.db(dbName);
    const collection = db.collection("mycollection"); // Replace 'mycollection' with your actual collection name

    // Build the query based on parameters
    const query = {};

    if (year_from && year_to) {
      query.year = { $gte: parseInt(year_from, 10), $lte: parseInt(year_to, 10) };
    }

    if (imdb_from && imdb_to) {
      query.imdb = { $gte: parseFloat(imdb_from), $lte: parseFloat(imdb_to) };
    }

    if (country) {
      query.country = { $elemMatch: { $regex: country, $options: "i" } };
    }

    if (genre) {
      const genreFix = genre[0].replace("[", "").replace("]", "").replace(/'/g, "");
      const genreArr = genreFix.split(",");
      query.genre = { $all: genreArr.map((g) => new RegExp(g, "i")) };
    }

    if (director) {
      query.director = { $regex: director[0], $options: "i" };
    }

    if (actors) {
      query.actors = { $elemMatch: { $regex: actors, $options: "i" } };
    }

    if (title_geo) {
      query.title_geo = { $regex: title_geo, $options: "i" };
    }

    if (Array.isArray(title_en) && title_en.length > 0) {
      query.title_en = { $in: title_en.map((en) => new RegExp(en, "i")) };
    }

    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const skip = (pageInt - 1) * limitInt;

    // Count total documents matching the query
    const totalArticles = await collection.countDocuments(query);

    // Fetch articles with cursor-based pagination
    const articles = await collection
      .find(query)
      .skip(skip)
      .limit(limitInt)
      .toArray();

    const totalPages = Math.ceil(totalArticles / limitInt);

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send({
      articles,
      totalPages,
      currentPage: pageInt,
    });
  } catch (err) {
    console.error(`Error fetching data from MongoDB: ${err}`);
    res.status(500).json({ error: "Error fetching data from MongoDB" });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
