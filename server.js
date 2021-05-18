if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');

//ROUTERS
const indexRouter = require('./routers/index');
const authorRouter = require('./routers/authors');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/partials');
app.use(express.urlencoded({extended: true, limit: '10mb'}))

app.use('/', indexRouter);
app.use('/authors', authorRouter);

const portNum = process.env.PORT || 3000;
const dbURI  = process.env.DATABASE_URL;
mongoose.connect(dbURI, {
    useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true,
    useUnifiedTopology: true
}).then(result => {
    console.log('connected to mongodb')
    app.listen(portNum)
}).catch(err => {
    console.log(err)
})