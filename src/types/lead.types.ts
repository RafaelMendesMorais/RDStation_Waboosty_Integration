export interface Lead { 
    nome?: string
    email?: string
    phone: string
    origem?:  string
    programa?: string

}

export type LeadStatus = "Em negociação" | "Não respondeu" | "Busca outra solução" | "Achou Caro" | "Fechado" 