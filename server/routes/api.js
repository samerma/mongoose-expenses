const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense.js')
const moment = require('moment')


router.get('/expenses', function (req, res) {
    Expense.find({})
        .sort('-date')
        .exec(function (err, expenses) {
            res.send(expenses)
        })
})

router.post('/new', function (req, res) {
    const expense = new Expense({
        item: req.body.item,
        amount: req.body.amount,
        date: req.body.date ? moment(req.body.date).format('LLLL') : moment().format('LLLL'),
        group: req.body.group
    })
    expense.save(function (error, ex) {
        console.log('spent ' + ex.amount + ' on ' + ex.item)
        res.end()
    })
})











module.exports = router
