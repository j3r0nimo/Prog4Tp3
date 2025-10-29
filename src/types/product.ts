// tipado, esquema ProductSchema, Zod
import { z } from "zod";

//valido objetos en timpo de ejeecucion, util para validar datos q vienen de una API, incluso si estan mockeados
const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  price: z.number().positive(),
});
//defino el tipo para usar en conmponentes y logica
export type Product = z.infer<typeof ProductSchema>;