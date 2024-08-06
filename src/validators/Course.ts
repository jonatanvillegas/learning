//Permite definir y validar esquemas de datos de manera fácil
import {z} from "zod"

export const createChaptersSchema = z.object({
    title: z.string().min(3).max(100),
})