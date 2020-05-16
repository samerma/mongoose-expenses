const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./server/routes/api')
const expensesData = require('./expenses.json')
const Expense = require('./server/models/Expense.js')


mongoose.connect("mongodb://localhost/Expenses", { useNewUrlParser: true })
    .then(() => { console.log("Succesfully Connected to the Mongodb Database") })
    .catch(() => { console.log("Error Connecting to the Mongodb Database") })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', api)

/////-----load data to DB---/////////
/* for (let ex of expensesData) {
    const expense = new Expense(ex)
    expense.save()
} */
//////////////////////////////////

const port = 3002
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})