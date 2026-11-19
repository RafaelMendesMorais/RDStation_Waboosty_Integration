import { z } from 'zod'

export const LeadSchema = z.object({
    rd_uuid: z.uuid().optional(),
    name: z.string().min(2, "Nome muito curto"),

    email: z.string().email("Email inválido").optional(),

    phone: z.string().regex(/^55\d{10,11}$/, "Telefone deve estar no formato 55DDDNÚMERO"),

    origem: z.string().min(2, "Origem inválida").optional(), 

    programa: z.string().min(2, "Programa inválido").optional()
})

export type LeadInput = z.infer< typeof LeadSchema>