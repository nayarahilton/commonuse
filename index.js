var fs = require('fs')
var express = require('express')
var app = express()
var _ =  require('lodash')
var pages = []
var engines = require('consolidate') 



fs.readFile('pages.json', {enconding: 'utf8'}, function (err, data) {
    if(err) throw err

    JSON.parse(data).forEach(function (page) {
        pages.push(page)
    })

})

app.engine('pug', engines.pug) // Set default template

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('assets'))

app.get('/', function (req, res) {
    res.render('index', {pages: pages})
    // res.send('Hello')
})

app.get(/big.*/, function (req, res, next) {
    console.log('BIG USER ACCESS')
    next()
})


app.get('/:page', function (req, res) {
    var page = req.params.page
    res.render('categories', {page: page})
})

var server = app.listen(3131, function () {
    console.log('Server running at http://localhost:' + server.address().port)
})
