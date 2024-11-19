import express from 'express';
import db from './startup/db';
import route from './startup/route';

const app = express();

db();
route(app);

const PORT = process.env.PORT;
if (!PORT) throw Error('Port for server is not provided');

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
