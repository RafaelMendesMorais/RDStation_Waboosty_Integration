import axios from "axios";
import { env } from "../config/env"
import { LeadInput } from "../schemas/lead.schema";

export class WaboostyClient {

    static async createLead( lead: LeadInput) {

        const payload = {
            lead: {
                nome: lead.nome,
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

        const response = await axios.post(env.waBoostyWebhookUrl, payload)

        return response.data
    }


}