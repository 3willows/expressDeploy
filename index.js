require("dotenv").config()

// express set up

const port = process.env.PORT

const express = require("express")
const app = express()

app.use(express.static("public"))
app.use(express.json())

app.listen(port, () => console.log(`Server ready on port ${port}.`))

// mongoose set up

const uri = process.env.DB_URL
const mongoose = require("mongoose")

async function main() {
  try {
    await mongoose.connect(uri, { dbName: "people" })
    console.log("connected!")
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

// mongoose actions

async function addName() {
  if (postRequestName) {
    Court.create({
      name: postRequestName,
    })
    console.log("name added")
  }
}

async function findEveryone() {
  return Court.find()
}

let postRequestName

app.post("/", (req, res) => {
  postRequestName = req.body.name
  addName()
})

app.get("/", async (req, res) => {
  const judges = await findEveryone()
  const namesArray = judges.map(obj => obj.name)
  res.send(`This everyone on the list: ${namesArray.join(", ")}!`)
})
