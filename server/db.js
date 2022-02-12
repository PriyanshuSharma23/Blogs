
const { MongoClient } = require('mongodb')
const DotEnv = require("dotenv")

DotEnv.config();

const database = {
    name: "Blogs",
    collections: [
        "Users"
    ]
}

const uri = `mongodb+srv://Priyanshu:${process.env.PASSWORD}@cluster0.kpkbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,

    Client = {
        client: new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }),
        addUser: async function (user) {
            const data = await this.client.db(database.name).collection(database.collections[0]).insertOne(user)
            return data
        },
        userExists: async function (username) {
            const arr = await this.client.db(database.name).collection(database.collections[0]).findOne({ username: username })
            return Boolean(arr);
        },
        credentialCheck: async function (user) {
            const res = await this.client.db(database.name).collection(database.collections[0]).findOne({ username: user.username })
            if (!Boolean(res)) return false;
            if (res.password == user.password) return true
            else return false
        },
        getUser: async function (username) {
            const res = await this.client.db(database.name).collection(database.collections[0]).findOne({username: username}, {password: false})
            return res;
        }
    }

module.exports = {
    Client
}