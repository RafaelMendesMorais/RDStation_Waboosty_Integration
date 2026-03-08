
import axios from 'axios';
import { WaboostyWebhookInput } from './../schemas/waboosty.schema';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export class rdStationClient {

    static async UpdateLeadStatus(lead: WaboostyWebhookInput) {

        const payload = {
            status: lead.status
        }

        

        const response = await axios.patch(
            `${env.rdApiUrl}/platform/contacts/phone:${lead.phone}`, payload,
            {
                headers: {
                    Authorization: `Bearer ${env.rdApiToken}`,
                    "Content-Type": "application/json"
                }
            }
        )

        return response.data


    }
}