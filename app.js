var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {

    var now = new Date().toString();
    var log =`${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('log.txt',log+'\n',(err) =>{
        if (err) console.log('could not append file')
    });

    next();
})

// app.use((req,res,next) => {
//     res.render('maintenance');
// })

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getFullYear', () =>{
    return new Date().getFullYear()
})

hbs.registerHelper('capitalizetext', (text) =>{
    return text.toUpperCase();
})

app.get('/',(req,res) => {
    res.render('home',
    {
        title:'Home Page',
        welcomeText:'Welcome to my node site',

    }
    )
})

app.get('/own',(req,res) => {
    res.render('own',{
        title:'My own page'
})
})

app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'unable to fullfill your request'
})

});

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        title:'About Page',

});
})

app.get('/project',(req,res) =>{
    res.render('project',{
        title:'Here is the project page'
})
})



app.listen(port,() =>{
    console.log(`app is running on port ${port}`);
});