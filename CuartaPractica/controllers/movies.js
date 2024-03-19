import { MovieModel } from "../models/movie.js";
import { validatePartialMovie } from "../Schema/movies.js";
export class MovieController{
    static async getAll(req,res){
            const { genero } = req.query;
            const movies = await MovieModel.getAll({genero});
            res.json(movies);
    }

    static async getById (req,res){
        const { id } = req.params;
        const movie = await MovieModel.getById({id})
        console.log(movie)
        if (movie) {
            res.json(movie)
        } else {
            res.status(404).json({ message: "Movie not found" })
        };
    }

    static async create (req,res){
        const resultado = validatePartialMovie(req.body); 
        if (resultado.error) {
            const errorMessages = resultado.error.errors.map(err => err.message);
            res.status(404).json({ message: "Hubo un error al intentar cargar la película: " + errorMessages.join(", ") });
        }
        console.log(resultado.data);
        const newMovie = await MovieModel.create(resultado.data);
        res.status(201).json(newMovie);
    }

    static async update(req,res){
        const result= validatePartialMovie(req.body);
        if (result.error) {
            res.status(404).json({message: JSON.parse(result.error.message) })
        }
        const {id} = req.params;
        const updatedMovie = await MovieModel.update({id,input:result.data})
        if (updatedMovie) {
            console.log(updatedMovie)
            res.json(updatedMovie)
        } else {
            res.status(404).json({message:"No se encontro la pelicula"})
        }
    }

    static async delete(req,res){
        const {id} = req.params
        const resultado = await MovieModel.delete({id});
        if (!resultado) {
            return res.status(404).json({message:"No se encontro la pelicula"})
        }

        return res.json({message:"Pelicula Eliminada"})
    }
}