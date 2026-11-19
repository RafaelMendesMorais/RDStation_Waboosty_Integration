import { z } from 'zod'

export const waboostyWebhookSchema = z.object({
    rd_uuid: z.uuid().optional(),
    phone: z.string(),
    status: z.enum([
    "em_negociacao",
    "nao_respondeu",
    "busca_outra_solucao",
    "achou_caro",
    "fechado"
    ])
})

export type WaboostyWebhookInput = z.infer<typeof waboostyWebhookSchema>