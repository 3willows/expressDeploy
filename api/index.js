require("dotenv").config()

const port = process.env.PORT

const express = require("express")
const app = express()

app.use(express.static("public"))
app.use(express.json())

app.listen(port, () => console.log(`Server ready on port ${port}.`))


const uri = process.env.DB_URL
const mongoose = require("mongoose")

async function main() {
  try {
    await mongoose.connect(uri, {dbName: "people"})
  } catch {
    console.log("error in connecting to database")
  }
}

main().catch((err) => console.log(err))

const Schema = mongoose.Schema

const JudgeSchema = new Schema({
  name: String,
})

const Court = mongoose.model("legal", JudgeSchema)

let result = "no result"

async function action() {
  const count = await Court.countDocuments()
  const oneJudge = await Court.findOne()
  console.log(count)
  if (oneJudge) {
    console.log(oneJudge.name)
    result = oneJudge.name
  }
}
action()

app.post('/', (req, res) => {
  result = req.body.name
  console.log(result)
})

app.get('/', (req, res) =>{
  res.send(`here we go ${result}!`)
})