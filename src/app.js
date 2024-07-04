const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("waterinpdf");
});

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});

module.exports = app;
