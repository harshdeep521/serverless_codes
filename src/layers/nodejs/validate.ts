import { ZodError } from "zod";

export const validation = (schema:any, data:any)=> {
    const result = schema.safeParse(data);
    console.log(result.error);
    if(!result.success){
        const error = result.error as ZodError;
        return {
            success: false,
            error: error.issues.map((e:any) => ({
                    field: e.path.join("."),
                    message: e.message
                }))
        }

    }
     return {
         success: true,
         data: result.data,
     };

}