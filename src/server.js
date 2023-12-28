import express from 'express';
import routes from './routes/index.js';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from './swagger-docs.json' assert { type: 'json'};


const port = process.env.PORT || 3000;
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routes(app);


app.listen(port, () => {
    console.log("server running")
});