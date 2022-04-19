// const http = require('http');
// const PORT = 3000;
// const songs= [
//     {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
//     {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
//     {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
//     {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
//     {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
//     {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
//     {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
//     {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
//     {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
// ]

// const server = http.createServer();

// server.on('request',(request,response)=>{
//     if(request.url==="/songs"&&request.method==="GET"){
//         response.setHeader("Content-Type","application/json");
//         response.end(JSON.stringify(songs));
//     }
//     else{
//         response.setHeader("Content-Type","text/plain");
//         response.end("Not hello");
//     }
// })

// server.listen(PORT,()=>{
//     console.log("Server running at " + PORT);

// })//127.0.0.1

const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser');
const url='mongodb+srv://shubham7090:shubham7090@cluster0.snwvf.mongodb.net/feedback'
const app=express();
const jsonParser = bodyParser.json()
var cors = require("cors");
app.use(express.static('public'));
app.use(cors());
var corsOptions = {
    origin: "http://127.0.0.1:5500",
    optionsSuccessStatus: 200,
  };

// mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
//     if(!err){
//         console.log("Connectioned to db");
//     }else {
//         console.log("error on connection with db");
//     }
// });

const feedbackSchema={
    name:String,
    email:String,
    like:String,
    val:String,
    content:String
}
const feed = mongoose.model("Feedback",feedbackSchema);

mongoose.connect(url).then(()=>{
    console.log('connection sucessful')
    }).catch((err)=>{
    console.log('no connection', err)
    })


app.get('/',async(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    });
    // res.send('hello Server');
    // res.sendFile(__dirname+"/MusicPlayer/player.html");
    let result=await feed.find();
    console.log(result);
    console.log('Get request');
    res.json(result);
})

app.post("/", cors(corsOptions),jsonParser,function(req,res){
    console.log("COde reached here");
    console.log(req.body);
    let val=req.body;
    let user=new feed(val);
    user.save(function(){
        console.log("db committed");
    });
})



app.listen(3000,function(){
    console.log('Server started')
})

