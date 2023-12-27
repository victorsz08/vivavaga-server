import bodyParser from 'body-parser';


import users from './userRoute.js';
import auth from './authRoute.js';


export default app => {
    app.use(
        bodyParser.json(),
        auth,
        users,
    );
};