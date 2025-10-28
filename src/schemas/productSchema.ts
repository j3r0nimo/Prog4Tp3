// Definición del esquema Zod
// Se utiliza para validar datos en tiempo de ejecución
// y para definir el tipo en tiempo de compilación.
// Para importarlo, en donde se lo use, encabezar con esta linea:
// import { ProductSchema, Product } from '../schemas/productSchema';

import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  price: z.number().positive(),
});

export type Product = z.infer<typeof ProductSchema>;
