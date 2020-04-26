const express=require('express');
const path=require('path');
const logger=require('./middleware/logger');

const app=express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//init the middleware
// app.use(logger);

//set static folder
app.use(express.static(path.join(__dirname,'static')));

//use that router
app.use('/api/members',require('./routes/api/members'));


// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'static','index.html'));
// })


const port=process.env.PORT || 2000;

app.listen(port,()=>console.log(`Server running at ${port}`));