const express = require("express");
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express();



app.use(bodyParser.json())


app.post("/user", (req, res) => {
    console.log(req.body)
    const { name, email, mobile } = req.body; 
    let userDetailes = `name:${name}; email:${email}; mobile:${mobile}`;
    fs.writeFileSync("users.txt", userDetailes);
    res.send("ok");
});
app.listen(8000, () => {
    console.log("server started");
});

