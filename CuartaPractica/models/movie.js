import { randomUUID } from 'node:crypto';
import {createRequire} from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('../movies.json')

export class MovieModel {

    static async getAll  ({genero}){
        if (genero) {
            const filterMovies = movies.filter(
                movie => movie.genero.some(g => g.toLowerCase() === genero.toLowerCase())
            );
            return (filterMovies);
        }
         return (movies);
    }
    static async getById({id}){
        const movie = movies.find(movie=> movie.id == id)
        return movie
    }

    static async create(input){
        console.log("input: ")
        console.log(input)
        const newMovie = {
            id: randomUUID(),
            ...input
        };
        movies.push(newMovie);

        return newMovie;
    }

    static async delete({id}){
        const movieIndex = movies.findIndex(movie=>movie.id==id)
        if (movieIndex<0) return false;
        movies.splice(movieIndex,1)
        return true
    }

    static async update({id,input}){
        const movieIndex = movies.findIndex(movie=>movie.id==id);

        if (movieIndex <0) return flase
    
        const updateMovie = {
            ...movies[movieIndex],
            ...input
        }
        return(updateMovie);
        movies[movieIndex]=updateMovie
    }
}