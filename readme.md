# Integração RD Station Marketing e Waboosty

API em Node.js, Express e TypeScript para encaminhar leads à Waboosty e registrar o status comercial como tag no contato da RD Station. Os dois webhooks aguardam a resposta do destino antes de confirmar o processamento.

## Rodar localmente

Use Node.js 22 ou 24 com npm. Na pasta do projeto, execute no PowerShell:

```powershell
npm ci
Copy-Item .env.example .env
```

Preencha o `.env` e rode `npm run dev`. O servidor usa a porta 3333 por padrão.

| Variável | Uso |
| --- | --- |
| `PORT` | Porta HTTP local. Padrão 3333. |
| `RD_API_URL` | Base da API. Padrão `https://api.rd.services`. |
| `RD_API_TOKEN` | Token de acesso Bearer da RD Station Marketing. |
| `WABOOSTY_WEBHOOK_URL` | URL completa de recebimento de leads na Waboosty. |

## Configurar os webhooks

Os exemplos abaixo mostram o formato que esta API recebe. Configure o mapeamento dos campos na automação que envia cada evento. Use `Content-Type: application/json`.

**`POST /webhook/rd`** recebe o nome e o telefone brasileiro com código do país e DDD, apenas dígitos. E-mail, origem, programa e UUID do contato são opcionais.

```json
{
  "name": "Ana Silva",
  "phone": "5511999990000",
  "email": "ana@example.com",
  "origem": "landing-page",
  "programa": "Engenharia",
  "rd_uuid": "7f3079e8-cdd1-4dcb-9030-d453316d640d"
}
```

Na Waboosty, `origem`, `program` e `rd_uuid` seguem em `lead.variables` quando preenchidos. Para o retorno pela API pública da RD, envie o UUID real do contato no primeiro webhook e mapeie essa variável de volta para o campo `rd_uuid` no segundo.

**`POST /webhook/waboosty`** recebe o telefone e o novo status. Com `rd_uuid`, a integração faz PATCH no contato por UUID, com `tags: [status]`. O formato anterior com apenas telefone e status continua encaminhando por `phone:`. Confirme o suporte desse caminho no seu destino antes de usar o formato antigo. [Atualização de contatos na RD Station Marketing](https://developers.rdstation.com/reference/enriquecimento-de-dados-rdsm)

```json
{
  "phone": "5511999990000",
  "status": "fechado",
  "rd_uuid": "7f3079e8-cdd1-4dcb-9030-d453316d640d"
}
```

Status aceitos: `em_negociacao`, `nao_respondeu`, `busca_outra_solucao`, `achou_caro` e `fechado`.

| Resposta | Significado |
| --- | --- |
| 200 | O destino aceitou a requisição. |
| 400 / 413 | JSON malformado ou corpo acima do limite. |
| 422 | Dados inválidos. O campo `errors` identifica os campos que precisam de correção. |
| 502 | Falha ao chamar o serviço externo. |
| 504 | O serviço externo excedeu o timeout de 5 segundos. |

## Testar e compilar

`npm test` compila o TypeScript e roda testes HTTP com servidores locais e dados fictícios. Os testes cobrem o envio de lead, o retorno por UUID, a validação do status e a falha de cada destino.

Para executar a versão compilada, rode `npm run build` e depois `npm start`.
