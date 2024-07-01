// Refer to this blog entry: https://3willows.github.io/2024-07-01-mongooseschemamodel1/

const uri = process.env.DB_URL;
const port = process.env.PORT || 3000;
const localTest = "mongodb://127.0.0.1:27017/test"

const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.use(express.static("public"))

main().catch((err) => console.log(err))

async function main() {
  await mongoose.connect(localTest)
}

// There is no goingCrazy property in Kitten
const kittySchema = new mongoose.Schema({
  name: String,
  goingCrazy: Number
})

const Kitten = mongoose.model("Kitten", kittySchema)

async function doSomething() {
  const cats = await Kitten.countDocuments()
  const names = await Kitten.find()
  const oneCat = await Kitten.findOne()
  console.log(cats)
  console.log(names)
  console.log(oneCat.name)
}
doSomething()

app.listen(port, () => console.log(`Server ready on port ${port}.`))

module.exports = app