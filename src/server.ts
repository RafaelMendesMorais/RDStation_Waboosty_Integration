import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import webhookRoutes from "./routes/webhook.routes";
import { env } from './config/env';


const app = express();  

app.use(express.json());

app.use('/webhook', webhookRoutes)

 // Rotas:  http://localhost:3333/webhook/rd
 //         http://localhost:3333/webhook/waboosty

app.use(errorMiddleware)

app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
})