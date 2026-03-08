import dotenv from 'dotenv'

dotenv.config()

export const env = { 
    port: process.env.PORT || 3333,
    rdApiUrl: process.env.RD_API_URL || "",
    rdApiToken: process.env.RD_API_TOKEN || "",
    waBoostyWebhookUrl: process.env.WABOOSTY_WEBHOOK_URL || ""
}

if(!process.env.RD_API_TOKEN){
   throw new Error("RD_API_TOKEN não configurado")
}

if(!process.env.WABOOSTY_WEBHOOK_URL){
   throw new Error("WABOOSTY_WEBHOOK_URL não configurado")
}