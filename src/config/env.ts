import "dotenv/config";
import { z } from "zod";

const httpUrl = z.url({ protocol: /^https?$/ });
const configuration = z.object({
    PORT: z.coerce.number().int().min(1).max(65535).default(3333),
    RD_API_URL: httpUrl.default("https://api.rd.services"),
    RD_API_TOKEN: z.string().trim().min(1),
    WABOOSTY_WEBHOOK_URL: httpUrl
}).safeParse(process.env);

if (!configuration.success) {
    const fields = configuration.error.issues.map(issue => issue.path.join("."));
    throw new Error(`Confira as variáveis de ambiente: ${fields.join(", ")}`);
}

export const env = {
    port: configuration.data.PORT,
    rdApiUrl: configuration.data.RD_API_URL.replace(/\/+$/, ""),
    rdApiToken: configuration.data.RD_API_TOKEN,
    waBoostyWebhookUrl: configuration.data.WABOOSTY_WEBHOOK_URL
};
