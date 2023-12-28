import bodyParser from 'body-parser';


import users from './userRoute.js';
import auth from './authRoute.js';
import companies from './companyRoute.js';
import lots from './lotRoute.js';


export default app => {
    app.use(
        bodyParser.json(),
        auth,
        users,
        companies,
        lots,
    );
};