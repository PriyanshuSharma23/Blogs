const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("./db");
const cors = require("cors");
const { sendStatus } = require("express/lib/response");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectDB() {
    try {
        await Client.client.connect();
    } catch (e) {
        console.log(e);
    } finally {
        await Client.client.close();
    }
}

app.post("/addUser", async function (req, res) {
    await Client.client.connect()
    const user = req.body;

    const userExists = await Client.userExists(user.username);

    if (!userExists) {
        const data = await Client.addUser(user);
        console.log(data.insertedId)
        res.sendStatus(200)
    } else {
        res.sendStatus(500)
    }

});

app.post("/login", async function (req, res) {
    await Client.client.connect();
    const user = req.body;

    const valid = await Client.credentialCheck(user);

    console.log(valid);
    if (valid) res.sendStatus(200)
    else res.sendStatus(500)
})

app.get("/fetchUser", async function (req, res) {
    await Client.client.connect();
    let reqData = req.query;

    let user = await Client.getUser(reqData.username);
    if (user) {
        user.password = null

        res.json({
            ...user
        })
    }
})

app.listen(5000, console.log("App hosted at port", 5000));
