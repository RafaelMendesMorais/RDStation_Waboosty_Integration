export interface Lead { 
    nome?: string
    email?: string
    telefone: string
    origem?:  string
    programa?: string

}

export type LeadStatus = "Em negociação" | "Não respondeu" | "Busca outra solução" | "Achou Caro" | "Fechado" 