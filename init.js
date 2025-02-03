const mongoose=require("mongoose")
const chat=require("./modals/chat.js")
mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
main().then((res)=>{
    console.log("consection is sucsses")
}).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
const allUser=[{
    from:"kumkum",
    to:"suhani",
    msg:"hello shuhani kesi ho",
    create_at:new Date()
},
{
    from:"lalu",
    to:"suhani",
    msg:"hello lalu kese ho",
    create_at:new Date() 
},
{
    from:"desi",
    to:"jann",
    msg:"hello jann kesi ho",
    create_at:new Date()
}
]
chat.insertMany(allUser).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})