import axios from "axios";
import { env } from "../config/env";
import { LeadInput } from "../schemas/lead.schema";

export class WaboostyClient {
    static async createLead(lead: LeadInput) {
        const variables = [];
        if (lead.origem) variables.push({ name: "origem", content: lead.origem });
        if (lead.programa) variables.push({ name: "program", content: lead.programa });
        if (lead.rd_uuid) variables.push({ name: "rd_uuid", content: lead.rd_uuid });

        await axios.post(env.waBoostyWebhookUrl, {
            lead: { name: lead.name, phone: lead.phone, email: lead.email, variables }
        }, { timeout: 5000 });
    }
}
