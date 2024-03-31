const express=require("express");
const app=express();
let PORT= 5000;

const sendMail=require("./controllers/sendMail");

app.get("/",(req,res)=>{
    res.send("i am a server");

});
app.get("/sendemail",sendMail);

const start=async()=>{
    try {
        app.listen(PORT,()=>{
            console.log(`i am live ${PORT}`)
        });
    } catch (error) {
        
    }
}


start();
