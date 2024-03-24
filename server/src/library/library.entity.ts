import { z } from 'zod';

// data from zustand
export interface IDataFileZustand {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}

export const validateLibraryData = z.object({
    path: z.string(),
    sourceType: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    isPublic: z.boolean(),
    size: z.number(),
    filename: z.string(),
    originalname: z.string(),
    userId : z.number()
})

export type ILibraryEntity = z.infer<typeof validateLibraryData>;
