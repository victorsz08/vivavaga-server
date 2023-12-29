import express from 'express';
import routes from './routes/index.js';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import swaggerDocs from './swagger-docs.json' assert { type: 'json'};


const port = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(helmet());

app.use(cors({
    optionsSuccessStatus: 200,
    methods: ["GET,POST,PUT,DELETE"],
    origin: "http://localhost:5173",
    credentials: true,
}));


routes(app);


app.listen(port, () => {
    console.log("server running")
});