const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense.js')
const moment = require('moment')


router.get('/expenses/:d1?/:d2?', function (req, res) {
    const d1 = req.query.d1
    const d2 = req.query.d2
    if (d1 && d2) {
        Expense.find({
            "date": { "$gte": d1, "$lt": d2 }
        }).sort('-date')
            .exec(function (err, expenses) {
                res.send(expenses)
            })
    }
    else {
        Expense.find({})
            .sort('-date')
            .exec(function (err, expenses) {
                res.send(expenses)
            })
    }
})

router.get('/expenses/:group/:total?', function (req, res) {
    const group = req.params.group
    const total = req.params.total

    Expense.find({ 'group': group }, function (error, expenses) {
        if (total == 'true') {
            let sum = 0
            expenses.forEach(exp => sum += exp.amount)
            res.send('' + sum)
        }
        else {
            res.send(expenses)
        }
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

router.put('/update/:group1/:group2', function (req, res) {
    const group1 = req.params['group1']
    const group2 = req.params['group2']
    Expense.findOne({ 'group': group1 }, function (error, expense) {
        const changedGroup = expense.group
        expense.group = group2
        expense.save(function (err, exp) {
            const message = `Item ${exp.item} group was changed from ${changedGroup} to ${exp.group}`
            res.send(message)
        })
    })
})



module.exports = router
