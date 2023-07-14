const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');

const app = express();
app.use('../public', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(
//     cors({
//         origin: ["http://localhost:3000",
//           "https://kbutsho-job-portal.netlify.app"],
//         credentials: true,
//     })
// );
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

//route
app.use("/api/user", userRouter)
app.get('/', (req, res) => {
    res.send('welcome!')
});
app.get('/api/', (req, res) => {
    res.send('root api!')
});
app.all('*', (req, res) => {
    res.json({
        'status': 400,
        'message': 'api not found',
    });
});

module.exports = app;