import { MovieModel } from "../models/movie";

export class MovieController{
    static async getAll(req,res){
            const { genero } = req.query;
            const movies = await MovieModel.getAll({genero});
            res.json(movies);
    }

    static async getById (req,res){
        const { id } = req.params;
        const movie = MovieModel.getById({id})
        if (movie) return res.json(movie);
        res.status(404).json({ message: "Movie not found" });
    }

    static async create (req,res){
        const resultado = validateMovie(req.body); 
        if (resultado.error) {
            const errorMessages = resultado.error.errors.map(err => err.message);
            return res.status(404).json({ message: "Hubo un error al intentar cargar la película: " + errorMessages.join(", ") });
        }
        const newMovie = await MovieModel.create(resultado.data);
        res.status(201).json(newMovie);
    }

    static async update(req,res){
        const result= validatePartialMovie(req.body);
        if (result.error) {
            res.status(404).json({message: JSON.parse(result.error.message) })
        }
        const {id} = req.params;
        const movieIndex = movies.findIndex(movie=>movie.id==id);
        const updatedMovie = MovieModel.update({id,input:result.data})
        if (updatedMovie) res.status(404).json({message:"No se encontro la pelicula"})
        return res.json(updatdeMovie)
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