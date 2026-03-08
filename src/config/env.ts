import dotenv from 'dotenv'

dotenv.config()

export const env = { 
    port: process.env.PORT || "",
    rdApiUrl: process.env.RD_API_URL || "",
    rdApiToken: process.env.RD_API_TOKEN || "",
    waBoostyWebhookUrl: process.env.WABOOSTY_WEBHOOK_URL || ""
}