const { application } = require("express");
const express=require("express");
const mongoose=require("mongoose");
const Router=require("./routes");
application.use(express.json());

mongoose.connect('mongodb://localhost:27017/usersdb',{
    useNewUrlParser:true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


