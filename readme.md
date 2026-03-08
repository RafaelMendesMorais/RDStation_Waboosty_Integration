# Integração RD Station + Waboosty

Projeto de integração entre RD Station Marketing e Waboosty.

O objetivo é:

1. Receber dados de leads da RD Station
2. Enviar esses dados para a Waboosty
3. Receber atualizações de status da Waboosty
4. Atualizar o lead na RD Station

---

# Fluxo da Integração

RD Station
↓
Backend (Node.js)
↓
Waboosty

Waboosty
↓
Webhook
↓
Backend
↓
Atualização na RD Station

---

# Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Zod (validação)
- Axios (requisições HTTP)

---

# Como rodar o projeto

1. npm install
2. npm run dev
3. Servidor iniciará em: http://localhost:3333