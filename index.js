import express from 'express';

const app = express();

app.use('/', express.static(`${__dirname}/public`, { maxAge: 60 * 1000 }));

app.get('/1', (req, res) => {
    res.set('Cache-Control', 'max-age=60');
    res.set('Content-Type', 'text/html');
    res.send(`
        <script src="/main.js" defer></script>
        <div>${new Date().toString()}</div>
        <div><a href="/2">2</a></div>
        <div><img src="https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg"></div>
    `);
});

app.get('/2', (req, res) => {
    res.set('Cache-Control', 'max-age=60');
    res.set('Content-Type', 'text/html');
    res.send(`
        <script src="/main.js" defer></script>
        <div>${new Date().toString()}</div>
        <div><a href="/1">1</a></div>
        <div><img src="https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg"></div>
    `);
});

const server = app.listen(process.env.PORT || 8080, () => {
    const { port } = server.address();

    console.log(`Server running on port ${port}`);
});
