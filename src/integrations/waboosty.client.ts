import axios from "axios";
import { env } from "../config/env"
import { LeadInput } from "../schemas/lead.schema";
import { logger } from "../utils/logger";

export class WaboostyClient {

    static async createLead(lead: LeadInput) {
        try {
            const payload = {
                lead: {
                    name: lead.name,
                    phone: lead.phone,
                    email: lead.email,
                    variables: [
                        {
                            name: 'origem',
                            content: lead.origem
                        },

                        {
                            name: 'program',
                            content: lead.programa
                        }
                    ]
                }

            }

            const response = await axios.post(env.waBoostyWebhookUrl, payload,
                {
                    timeout: 5000
                })

            logger.info("Lead enviado para Waboosty", lead.phone)
            return response.data

        } catch (error: any) {
            logger.error("Erro ao enviar lead para Waboosty", error.response?.data || error.message)

            throw new Error("Falha ao enviar lead para Waboosty")

        }

    }


}