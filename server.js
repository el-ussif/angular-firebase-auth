const express = require("express");
const app = express();
const path = require("path");


app.use(express.static(path.join(__dirname, "/dist")));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/'}),
);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server correctly started at port ", port));
