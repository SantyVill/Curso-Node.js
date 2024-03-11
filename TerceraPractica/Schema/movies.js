import z from "zod";
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
    year:z.number(),
})

export function validateMovie(object) {
    return movieSchema.safeParse(object);
}

export function validatePartialMovie(object){
    return movieSchema.partial().safeParse(object)
}

