const http=require('http');
const dotenv=require('dotenv');
const express = require('express');
const passport=require('./auth');
const app = express();
dotenv.config();
const PORT=process.env.PORT;
require("./config/db")();
const bodyParser=require('body-parser');
app.use(bodyParser.json());//req.body


//middleware function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}]Request Made To : ${req.originalUrl}`);
  next();//move on the next phase
}
app.use(logRequest);



//passport middleware(it is for username and password authentication)
app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false})


app.get('/',function (req, res) {
  res.send('Hello I am Mahendra')
})






//import the router files
const personRouter=require('./routes/personRoute');
const menuItemRouter=require('./routes/menuItemRoute');
//use the routers
app.use('/person' ,personRouter);
app.use('/menu', menuItemRouter);






 

 







let server = http.createServer(app);
server.listen(PORT,function(err){
    if(err)throw err;
    console.log(`server is running on port: ${PORT}`)
});