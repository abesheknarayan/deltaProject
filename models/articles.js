var mongoose=require("mongoose");

var articleSchema=new mongoose.Schema({
    title:String,
    body:String,
    short:String,
    createdUser:String,
    Date:String,
    readtime:String,
    likes:{
        type:Number,
        default:0
    },
    img:{
       src:String,
       name:String
    },
    comments:[{
        cmt:String,
        user:String
    }],
    tags:[{
        type:String
    }]

})

module.exports=mongoose.model("articles",articleSchema);