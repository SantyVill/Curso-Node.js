const z = require("zod");
const movieSchema = z.object({
    pelicula: z.string({
        invalid_type_error:"El nombre de la pelicula debe ser string",
        required_error:"El nombre de la pelicula es requerido"
    }),
    year:z.number({required_error:"el año es requerido"}).int().positive().min(1900).max(2024),
    genero:z.array(
        z.enum(['Accion','Terror','Comedia']),{
            required_error:"El genero es requerido"
        }
    ),
    recaudacion: z.string(),
})

function validateMovie(object) {
    return movieSchema.safeParse(object);
}

module.exports= {validateMovie}