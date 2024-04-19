const express =require("express");
const path=require("path");
const hbs  = require('hbs');
const app=express();
const port=process.env.PORT ||3000;



//public static path
const static_Path=path.join(__dirname,"../public");
const templates_Path=path.join(__dirname,"../templates/views");
const partials_Path=path.join(__dirname,"../templates/partials");

app.set('view engine', 'hbs');
app.set('views',templates_Path );
hbs.registerPartials(partials_Path);

app.use(express.static(static_Path));


// routing
app.get("",(req,res)=>{
  res.render('index')
});

app.get("/about",(req,res)=>{
    res.render('about')
  });

  app.get("/weather",(req,res)=>{
    res.render('weather')
  });

  app.get('*',(req,res)=>{
    res.render('error',{
      errorMsg:'oops Page Not Found'
    })
  });
  
  
  

app.listen(port,()=>{
    console.log(`listning to the port ${port}`);
})