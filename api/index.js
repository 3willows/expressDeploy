require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.use(express.static("public"))

main().catch((err) => console.log(err))

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test")
}

const kittySchema = new mongoose.Schema({
  name: String,
})

kittySchema.methods.speak = function speak() {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting)
}

const Kitten = mongoose.model("Kitten", kittySchema)

const silence = new Kitten({ name: "Silence" })
console.log(silence.name) // 'Silence'

const fluffy = new Kitten({ name: "Blair" })
fluffy.speak() // "Meow name is fluffy"

async function doSomething() {
  await fluffy.save()
}
doSomething()

let numOfEntries;

Kitten.countDocuments().then((count) => {
	numOfEntries = count
	console.log(count)})

app.get("/", function (req, res) {
  res.send(
    `Hello!  I am a deployed express App!  Hello to ${fluffy.name}!  There are ${numOfEntries} documents in the Kittens collection.`
  )
})

// need to remove this line when deploying
app.listen(3000, () => console.log("Server ready on port 3000."))

module.exports = app
