var mongoose=require("mongoose");
var articles=require("./articles.js");
var passportlocalmongoose=require("passport-local-mongoose");

var userSchema=new mongoose.Schema({
    username:String,
    email:{type:String,
      unique:true
    },
    password:String,
    dp:String,
    about:String,
    
    articles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'articles'
    }],
    likedart:[{
           type:mongoose.Schema.Types.ObjectId,
           ref:'articles'
    }],
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'articles'
    }],
    followers:[{
        user:String
    }],
    following:[{
        user:String
    }],
    interests:[{
        type:String
    }]

})

userSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model("users",userSchema);

