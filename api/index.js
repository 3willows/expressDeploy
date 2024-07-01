require("dotenv").config()

const port = process.env.PORT

const express = require("express")
const app = express()

app.use(express.static("public"))
app.use(express.json())

app.listen(port, () => console.log(`Server ready on port ${port}.`))

let result

app.post('/', (req, res) => {
  result = req.body.name
  console.log(result)
})
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

async function action() {
  if (result) {
    Court.create({
      name : result
    })
    console.log("nothing here!")
  }
  const count = await Court.countDocuments()
  const judges = await Court.find()
  console.log(count)
  if (judges) {
    for (let judge of judges){
      console.log(judge.name)
    }
  }
}
action()



app.get('/', (req, res) =>{
  res.send(`here we go ${result}!`)
})