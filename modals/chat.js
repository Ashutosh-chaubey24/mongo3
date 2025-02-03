const mongoose=require("mongoose")


const chatschema=new mongoose.Schema({
    from:{
        type:String,
        require:true
    },
    to:{
        type:String,
        require:true
    },
    msg:{
        type:String,
        MaxLenth:50
    },
    create_at:{
        type:Date,
        require:true
    }
})

const chat=mongoose.model("Chat",chatschema)
module.exports=chat;