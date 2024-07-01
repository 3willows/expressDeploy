require("dotenv").config()

const uri = process.env.DB_URL
const port = process.env.PORT || 3000
const mongoose = require("mongoose")

async function main() {
  try {
    // tried to manipulate the URL, but unsuccessful
    await mongoose.connect(uri, {dbName: "sample_analytics"})
    // mongoose.connection.useDb(databaseName);
    // const { databases } = await mongoose.connection.listDatabases()
    // databases.forEach((db) => console.log(db.name))
  } catch {
    console.log("error in connecting to database")
  }
}

main().catch((err) => console.log(err))

const express = require("express")
const app = express()

const Schema = mongoose.Schema

app.use(express.static("public"))

const JudgeSchema = new Schema({
  limit: Number,
})

const Court = mongoose.model("accounts", JudgeSchema)

async function action() {
  const count = await Court.countDocuments()
  const oneJudge = await Court.findOne()
  console.log(count)
  if (oneJudge) {
    console.log(oneJudge.name)
  }
}
action()

app.listen(port, () => console.log(`Server ready on port ${port}.`))

module.exports = app
