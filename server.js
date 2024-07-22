const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const articlesPath = path.join(__dirname, "src", "db", "mov", "articles.json");

// Load articles into memory
let articles = [];
try {
  const data = fs.readFileSync(articlesPath, { encoding: "utf8" });
  articles = JSON.parse(data);
} catch (err) {
  console.error(`Error loading articles: ${err}`);
}

app.use((req, res, next) => {
  const query = { ...req.query };
  Object.keys(query).forEach((key) => {
    if (Array.isArray(req.query[key])) {
      // Convert single string query params to arrays
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

app.get("/api/articles", (req, res) => {
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
    limit = 30,
  } = req.query;

  const { genre } = req.query;

  try {
    const filteredArticles = articles.filter((article) => {
      if (!article.genre) return false;

      let match = true;

      if (
        year_from &&
        year_to &&
        (article.year < year_from || article.year > year_to)
      ) {
        match = false;
      }

      if (
        imdb_from &&
        imdb_to &&
        (article.imdb < imdb_from || article.imdb > imdb_to)
      ) {
        match = false;
      }

      if (country && !article.country.some((item) => item.includes(country))) {
        match = false;
      }

      if (genre) {
        const genreFix = genre[0]
          .replace("[", "")
          .replace("]", "")
          .replace(/'/g, "");
        const genreArr = genreFix.split(",");

        if (genreArr && genreArr.length > 0) {
          if (!genreArr.every((g) => article.genre.includes(g))) {
            match = false;
          }
        }
      }

      if (director && !article.director.includes(director[0])) match = false;

      if (actors && !article.actors.some((actor) => actor.includes(actors)))
        match = false;

      if (
        title_geo &&
        typeof article.title_geo === "string" &&
        article.title_geo.indexOf(title_geo) === -1
      ) {
        match = false;
      }
      if (
        Array.isArray(title_en) &&
        title_en.length > 0 &&
        typeof article.title_en === "string"
      ) {
        const found = title_en.some(
          (en) =>
            typeof en === "string" &&
            article.title_en.toLowerCase().includes(en.toLowerCase())
        );
        if (!found) {
          match = false;
        }
      }
      return match;
    });

    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);

    const totalArticles = filteredArticles.length;
    const totalPages = Math.ceil(totalArticles / limitInt);

    const paginatedArticles = filteredArticles.slice(
      (pageInt - 1) * limitInt,
      pageInt * limitInt
    );

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send({
      articles: paginatedArticles,
      totalPages: totalPages,
      currentPage: pageInt,
    });
  } catch (err) {
    console.error(`Error filtering articles: ${err}`);
    res.status(500).json({ error: "Error filtering articles" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
