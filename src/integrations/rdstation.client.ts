import axios from "axios";
import { env } from "../config/env";
import { WaboostyWebhookInput } from "../schemas/waboosty.schema";

export class RdStationClient {
    static async updateLeadStatus(lead: WaboostyWebhookInput) {
        const identifier = lead.rd_uuid
            ? `uuid:${lead.rd_uuid}`
            : `phone:${encodeURIComponent(lead.phone)}`;

        await axios.patch(
            `${env.rdApiUrl}/platform/contacts/${identifier}`,
            { tags: [lead.status] },
            {
                timeout: 5000,
                headers: { Authorization: `Bearer ${env.rdApiToken}` }
            }
        );
    }
}
