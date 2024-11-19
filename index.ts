import express from 'express';
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/hello-world', async (req, res) => {
    res.send('req received');
});

const PORT = process.env.PORT;
if (!PORT) throw Error('Port for server is not provided');

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
