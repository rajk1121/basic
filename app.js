const express = require('express');
const app = require('./server');
const mongoose = require('mongoose');
const path = require('path')
app.use(express.json());

// app.use(express.static('/public/build'));
const PoemModel = require('./poewModels');
app.get('/api/poems', async (req, res) => {
    // let author = req.body.Author;
    try {
        let author = req.query.Author;

        console.log(author);
        let dbdata = await PoemModel.find({ Author: author });
        // console.log(dbdata)
        if (dbdata) {
            console.log("GET")
            res.status(201).json({
                dbdata
            })
        }
        else {
            res.status(401).json({
                Message: "Author doesn't exists"
            })
        }
    }
    catch (err) {
        res.status(404).json({
            err
        })
    }



})
app.post('/api/poems', (req, res) => {
    // res.send("Bye")
    let data = req.body;
    console.log(data)
    PoemModel.create(data).then((result) => {
        res.status(201).json({
            status: "Done",
            Result: result
        })
    }).catch((err) => {
        res.status(404).json({
            status: "Failed",
            err
        })
    })



})
app.delete('/api/poems', async (req, res) => {
    try {
        let author = req.body.Author;
        let dbdata = PoemModel.find({ Author: author });
        if (!dbdata) {
            res.end('Author not present');
        } else {
            PoemModel.deleteOne({ Author: author }).then((result) => {
                res.status(201).json({
                    status: 'deleted',
                    result
                })
            }).catch((err) => {
                res.status(404).json({
                    status: "Failed",
                    err
                })
            })
        }
    }
    catch (err) {
        res.status(404).json({
            err
        })

    }
})
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('myapp/build'))
    app.use('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'myapp', 'build', 'index.html'))
    })
}
const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log('Server listening')
})