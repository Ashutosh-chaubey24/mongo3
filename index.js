const express=require("express")
const app= express()
const mongoose=require("mongoose")
const chat=require("./modals/chat.js")
const path=require("path")
const methodOverride=require("method-override")
app.use(methodOverride('_method'))
const { render } = require("ejs")
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"public")))
mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
main().then((res)=>{
    console.log("consection is sucsses")
}).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
app.get("/chats",async(req,res)=>{
    let users= await chat.find()
    // console.log(users)
    res.render("index.ejs",{users})
})
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/chats",(req,res)=>{
    let{from,msg,to}=req.body;
    let newchat=new chat({
        from:from,
        to:to,
        msg:msg,
        create_at:new Date()
    })
    // console.log(newchat)
    newchat.save().then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
    res.redirect("/chats")
})
app.get("/chats/:id/edit",async(req,res)=>{
    let{id}=req.params;
    console.log(id)
   let chats= await chat.findById(id)
    res.render("edit.ejs",{chats})
})
app.put("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    console.log(id)
    let{editmsg}=req.body
    console.log(editmsg)
   let updatechat= await chat.findByIdAndUpdate(id,{msg:editmsg},{runValidators:true,new:true})
   console.log(updatechat)
   res.redirect("/chats")
})
app.delete("/chats/:i1d",async(req,res)=>{
    let{id}=req.params;
    let deletechat= await chat.findByIdAndDelete(id)
    // console.log(deletechat)
    res.redirect("/chats")
})
app.listen(2222,()=>{
    console.log("listen at port",2222)
})