const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currYear', ()=> new Date().getFullYear());
hbs.registerHelper('upperCase', (text)=> text.toUpperCase());

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
   let now = new Date().toString();
   let log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile(`server.log`, log +'\n');
   next();
});

// app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
// });

app.get('/',(req,res)=>{
  //  res.send('<h1>Hello World</h1>');
  res.render('home.hbs',{
    pageTitle:'Home page',
    welcomeMessage:'Welcome to my site',
  });
});

app.get('/about',(req,res)=>{
  // res.send('<h1>About page</h1>');
  res.render('about.hbs',{
    pageTitle:'About page',
    welcomeMessage:'Learn more about us'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    erroMessage:'Unable to handle request'
  });
});

app.listen(3000, ()=>{
  console.log('server up on port 3000');
});
