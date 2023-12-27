import express from 'express';
import routes from './routes/index.js';
import 'dotenv/config';


const port = process.env.PORT || 3000;
const app = express();

routes(app);


app.listen(port, () => {
    console.log("server running")
});