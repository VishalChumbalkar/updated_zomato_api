const mongoose = require("mongoose");

// Mongoose Connection
mongoose.connect("mongodb://127.0.0.1:27017/zomato_api")
.then(()=>{
    console.log("connection successfull");
})
.catch((e)=>{
    console.log(e);
})
