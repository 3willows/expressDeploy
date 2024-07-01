require("dotenv").config()

const uri = process.env.DB_URL;
const localTest = "mongodb://127.0.0.1:27017/test"
const port = process.env.PORT || 3000;
const mongoose = require("mongoose")

async function main() {
  await mongoose.connect(localTest)
}
main().catch((err) => console.log(err))

const express = require("express")
const app = express()

const Schema = mongoose.Schema

app.use(express.static("public"))

const JudgeSchema = new Schema({
  name: String
})

const Court = mongoose.model("Judges", JudgeSchema)

async function action() {
  const count = await Court.countDocuments()
  const oneJudge = await Court.findOne()
  console.log(count)
  console.log(oneJudge.name)
}
action()


app.listen(port, () => console.log(`Server ready on port ${port}.`))

module.exports = app
