const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("node:http");
const { once } = require("node:events");

async function listen(server, t) {
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    t.after(() => new Promise(resolve => server.close(resolve)));
    return "http://127.0.0.1:" + server.address().port;
}

test("webhooks com serviços externos simulados", async t => {
    const calls = [];
    let upstreamStatus = 200;
    const destination = await listen(createServer(async (req, res) => {
        let raw = "";
        for await (const chunk of req) raw += chunk;
        calls.push({ method: req.method, url: req.url, body: JSON.parse(raw), auth: req.headers.authorization });
        res.writeHead(upstreamStatus).end();
    }), t);

    Object.assign(process.env, {
        PORT: "3333",
        RD_API_URL: destination,
        RD_API_TOKEN: "token-de-teste",
        WABOOSTY_WEBHOOK_URL: destination + "/leads",
        NO_PROXY: "127.0.0.1"
    });
    const { app } = require("../dist/app");
    const base = await listen(createServer(app), t);
    const phone = "5511999990000";
    const rd_uuid = "7f3079e8-cdd1-4dcb-9030-d453316d640d";

    function post(route, body) {
        return fetch(base + "/webhook/" + route, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)
        });
    }

    await t.test("envia lead e identificador para a Waboosty", async () => {
        const res = await post("rd", { name: "Ana", phone, rd_uuid });
        assert.equal(res.status, 200);
        assert.deepEqual(calls.at(-1).body.lead, {
            name: "Ana", phone, variables: [{ name: "rd_uuid", content: rd_uuid }]
        });
    });

    await t.test("atualiza a tag do contato pelo UUID", async () => {
        const res = await post("waboosty", { phone, status: "fechado", rd_uuid });
        assert.equal(res.status, 200);
        assert.deepEqual(calls.at(-1), {
            method: "PATCH", url: "/platform/contacts/uuid:" + rd_uuid,
            auth: "Bearer token-de-teste", body: { tags: ["fechado"] }
        });
    });

    await t.test("rejeita status inválido antes de chamar a RD", async () => {
        const before = calls.length;
        const res = await post("waboosty", { phone, status: "inexistente" });
        assert.equal(res.status, 422);
        assert.equal((await res.json()).errors[0].field, "status");
        assert.equal(calls.length, before);
    });

    await t.test("propaga falhas dos dois destinos", async () => {
        upstreamStatus = 503;
        const rd = await post("waboosty", { phone, status: "fechado" });
        assert.equal(rd.status, 502);
        assert.equal(calls.at(-1).url, "/platform/contacts/phone:" + phone);
        const wa = await post("rd", { phone, name: "Ana" });
        assert.equal(wa.status, 502);
    });
});
