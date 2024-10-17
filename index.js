const express=require("express");
const app=express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const cors = require("cors")
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//Database Connection start
const mongoose=require("mongoose");
mongoose.connect('mongodb://0.0.0.0:27017/hello').then(()=>{
    console.log("connection successfull")
  
}).catch((error)=>
{
    console.log(error)
})



const noteroute=require("./Routes/sellNoteRoute")
const authroute=require("./Routes/routes")
const paymentroute=require("./Routes/paymentRoute")
app.use("/api/auth",authroute);
app.use("/api/auth",noteroute);
app.use("/api/auth",paymentroute);




app.listen(8000,()=>

    console.log('server is running in port 8000')
)