const express=require('express');
const router=express.Router()

router.get('/',async(req,res)=>{
    res.send('hello');
    console.log('Get request');
})


module.exports=router;