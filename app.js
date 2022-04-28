//feeedback connect
const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const jsonParser = bodyParser.json()
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const JWT_SECRET_TOKEN="dsvmdhbavm%^E^RvNVu7^&T&&hvnvd*((HDSDbdmbs";
var cors = require("cors");
app.use(cookieParser());
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
    access:Number,
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
    role:String,
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

app.post("/feedback", cors(corsOptions),jsonParser,async function(req,res){
    console.log("COde reached here");
    let val=req.body;
    console.log(val);
    const {token}=req.body;
    let userResult;
    try{
        userResult=jwt.verify(token.split('=')[1],JWT_SECRET_TOKEN);
        console.log(userResult);
    }catch(err){
        res.json({status:"error",error:'JWT token failiure'});
    }
    userResult=await userModel.findOne({_id:userResult.id});
    console.log(userResult);
    val.name=userResult.name;
    val.email=userResult.email;
    val.access=userResult.accessCount;
    console.log(val,userResult);
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
// let userResult;
app.post("/login", cors(corsOptions),jsonParser,async function(req,res){
    console.log("COde reached here");
    console.log(req.body);
    if(!req.body['email'] ||!req.body['password'] ){
        return res.json({status :'error',error : "All fields are required"});
    }
    let userResult=await userModel.find({email:req.body['email']});
    if(userResult.length==0){
        return res.json({status :'error',error : "username not registered"});
    }
    let match=await bcrypt.compare(req.body['password'],userResult[0].password);
    //first value ko hash kar kar doosri value se compare karta hai
    console.log(userResult[0].password);
    console.log(req.body['password']);
    console.log(match);
    if(match){
        console.log("code andar aa gaya");
        console.log(userResult[0]);
        console.log(userResult[0]['role']);
        if(userResult[0].role=='admin'){
            return res.json({status :'admin',data:"Logged in as Admin Successfully!"});
        }
        console.log(req.body['email'])
        userModel.updateOne({email:req.body['email']}, { $inc: { accessCount: 1 } }).exec();

        const token =jwt.sign({id:userResult[0]._id,email:userResult[0].email},JWT_SECRET_TOKEN);
        res.cookie("login",token);
        return res.json({status :'ok',data:token});
    }else{
        return  res.json({status :'error',error:"Wrong password"});
    }
   
})

// app.post("/rememberLogin", cors(corsOptions),jsonParser,async function(req,res){
//     console.log("Code reached here");
//     console.log(req.body);
//     const {token}=req.body;


//     try{
//         jwt.verify(token.split('=')[1],JWT_SECRET_TOKEN);
//         return res.json({status :'ok',data:"Login Successful by remember me functionallity"});
//     }catch(err){
//         res.json({status:"error",error:'JWT token failiure'});
//     }
   
// })
app.listen(3100,function(){
    console.log('Server started')
})

