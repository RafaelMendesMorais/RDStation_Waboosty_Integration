import { z } from 'zod'

export const LeadSchema = z.object({
    nome: z.string().optional(),
    email: z.email().optional(),
    phone: z.string(),
    origem: z.string().optional(), 
    programa: z.string().optional()
})

export type LeadInput = z.infer< typeof LeadSchema>