import { z } from "zod";
export const productSchema = z.object({
    name: z.string().nonempty(),
    cost: z.coerce.number()
});

export const productSchemaEdit = z.object({
   name: z.string().optional(),
   cost: z.number().optional()
})
.refine((data)=> data.name!==undefined || data.cost!==undefined, { message: "Either name or cost must be provided"} );