const express = require("express");
const crypto = require("node:crypto");
const movies = require("./movies.json");
const { validateMovie } = require("./Schema/movies");  // Cambiado a minúsculas

const app = express();
app.use(express.json());
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.json({ message: "Hola mundo" });
});

app.get("/movies", (req, res) => {
    const { genero } = req.query;
    if (genero) {
        const filterMovies = movies.filter(
            movie => movie.genero.some(g => g.toLowerCase() === genero.toLowerCase())
        );
        res.json(filterMovies);
    }
    res.json(movies);
});

app.get("/movies/:id", (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id == id);
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie not found" });
});

app.get("/movies/", (req, res) => {
    const { genero } = req.params;
    const movie = movies.find(movie => movie.genero == genero);
    if (movie) return res.json(movies);
    res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
    const resultado = validateMovie(req.body);  // Cambiado a minúsculas

    if (resultado.error) {
        const errorMessages = resultado.error.errors.map(err => err.message);
        return res.status(404).json({ message: "Hubo un error al intentar cargar la película: " + errorMessages.join(", ") });
    }
    const newMovie = {
        id: crypto.randomUUID(),
        ...resultado.data
    };
    movies.push(newMovie);
    res.status(201).json(movies);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log("server listening on port : http://localhost:" + PORT);
});
