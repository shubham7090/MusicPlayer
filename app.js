//feeedback connect
const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const jsonParser = bodyParser.json()
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const JWT_SECRET_TOKEN="dsvmdhbavm%^E^RvNVu7^&T&&hvnvd*((HDSDbdmbs";
var cors = require("cors");
app.use(express.static('public'));
app.use(cors());
var corsOptions = {
    origin: "http://127.0.0.1:5500",
    optionsSuccessStatus: 200,
};
const url='mongodb+srv://shubham7090:shubham7090@cluster0.snwvf.mongodb.net/feedback'
const feedbackSchema={
    name:String,
    email:String,
    like:String,
    val:String,
    content:String
}
const feed = mongoose.model("Feedback",feedbackSchema);

const userSchema= new mongoose.Schema({
    name:String,
    number:String,
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    accessCount: Number,
});
const userModel = mongoose.model("User",userSchema);

mongoose.connect(url).then(()=>{
    console.log('connection sucessful')
    }).catch((err)=>{
    console.log('no connection', err)
    })


app.get('/feedback',async(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    });
    let result=await feed.find();
    console.log(result);
    console.log('Get request');
    res.json(result);
})

app.post("/feedback", cors(corsOptions),jsonParser,function(req,res){
    console.log("COde reached here");
    console.log(req.body);
    let val=req.body;
    let user=new feed(val);
    user.save(function(){
        console.log("db committed");
    });
})

app.post("/register", cors(corsOptions),jsonParser,async function(req,res){
    console.log("COde reached here");
    console.log(req.body);
    if(!req.body['name'] || !req.body['number'] ||!req.body['email'] ||!req.body['password'] ){
        return res.json({status :'error',error : "All fields are required"});
    }

    req.body['password']=await bcrypt.hash(req.body['password'],10);
    let val=req.body;
    // let user=new userModel(val);
    // user.save(function(){
    //     console.log("User db committed");
    // });
    try{
        const response=await userModel.create(val);
        console.log("Db commited", response);
        
    }catch(err){
        console.log(err.code);
        if(err.code===11000){
            console.log("code reached here");
            return res.json({status :'error',error : "username already registered"});
        }else {
            console.log(err);
            return res.json(err);
        }
    }
    return res.json({status :'ok',data : "New user Registered"});
})

app.post("/login", cors(corsOptions),jsonParser,async function(req,res){
    console.log("COde reached here");
    console.log(req.body);
    if(!req.body['email'] ||!req.body['password'] ){
        res.json({status :'error',error : "All fields are required"});
    }
    let result=await userModel.find({email:req.body['email']});
    if(result.length==0){
        return res.json({status :'error',error : "username not registered"});
    }
    if(await bcrypt.compare(password,req.body['password'])){
        const token =jwt.sign({id:result[0]._id,email:result[0].email},JWT_SECRET_TOKEN)
        return  res.json({status :'ok',data:token});
    }
   
})

app.listen(3100,function(){
    console.log('Server started')
})

