import { Router } from "express";
import { randomUUID } from "node:crypto";
/* import { validateMovie, validatePartialMovie } from "./Schema/movies.js"; */  // Cambiado a minúsculas
import { MovieModel } from "../models/movie.js";
import { MovieController } from "../controllers/movies.js";


export const moviesRouter =  Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get("/:id", MovieController.getById);

/* moviesRouter.get("/", (req, res) => {
    const { genero } = req.params;
    const movie = movies.find(movie => movie.genero == genero);
    if (movie) return res.json(movies);
    res.status(404).json({ message: "Movie not found" });
}); */

moviesRouter.post("/", MovieController.create);

moviesRouter.delete("/:id",MovieController.delete);

moviesRouter.patch("/:id",MovieController.update);

/* moviesRouter.options('/:id',(req,res)=>{
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin)|| !origin) {
        res.header('Access-Control-Allow-Origin',origin)
        res.header('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE')
    }
    res.send(200);
}) */