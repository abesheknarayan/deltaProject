var express=require("express");
var app=express();


var port=3000;
var localStrategy=require("passport-local");
var passport=require("passport");

var passportlocalmongoose=require("passport-local-mongoose");
var mongoose=require("mongoose");
var path=require("path");
var flash=require("connect-flash");
const multer=require("multer");
const ejslint=require("ejs-lint");

var user=require("./models/users");
var article=require("./models/articles");



mongoose.connect("mongodb://localhost:27017/article",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
    
    
});
app.use(express.static(__dirname + '/public'));
app.use(express.json({
    type:[ 'application/json','text/plain']
}))

const storage=multer.diskStorage({
    destination:"./public/uploads/",
    filename: function(req,file,cb){
        cb(null,file.fieldname +"-" + Date.now() +path.extname(file.originalname))
    }  
  });
  const upload=multer({
      storage:storage
  });

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(require("express-session")({
secret:"CR7 is the best",
resave:false,
saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



///////////////////Login Register main Routes////////////////////////////

app.get("/",(req,res)=>{
    res.render("main");

})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.get("/setprofile",isloggedin,(req,res)=>{
    res.render("setprofile",{
        user:req.user
    });
})
app.get("/login",(req,res)=>
{
    res.render("login");
})

async function renderhome(req,res)
{
    try{
    var allart= await article.find({});
    var user1=await user.findById(req.user.id);

     res.render("home",{
         articles:allart,
         user:user1
     })
    } 
    catch(err)
    {
        console.log(err);
    }

}

app.get("/home",isloggedin,(req,res)=>
{
    renderhome(req,res);
})

app.post("/register",(req,res) =>
{ req.body.username
    req.body.password

    user.register(new user({
        username:req.body.username,
        

    }),req.body.password,(err,user)=>
    {
        if(err)
        {
            console.log(err);
            var m=err.message
            req.flash("loginerror",m);
            res.redirect("/register");
           
        }
        else{

        

        
        passport.authenticate("local")(req,res,()=>
        {
           req.flash("welcome"," Welcome "+user.username) 
           res.redirect("/setprofile");          
           
        });
       
        }
    });
});
app.post("/login",passport.authenticate("local",
{   
    
    successRedirect:"/home",

    failureRedirect:"/login",
}),function(req,res)
{
if(err)
{

  console.log(err);


}
else
{

}
});
function isloggedin(req,res,next)
{
    if(req.isAuthenticated())

    {
        return next();
    }
    else{
    req.flash("error","Please login!!");
    res.redirect("/login");
}
}
app.get("/logout",(req,res)=>
{
    req.logout();
     req.flash("logout","Successfully logged you out!");
    res.redirect("/login");
});

/////////////////////////////user function routes/////////////////////////////////////////

async function setavatar(req,res)
{
    try{
        console.log(req.params.pname) ;
          var user1=await user.findById(req.user.id);
          user1.dp="/images/avatar/"+req.params.pname+".jpg";
          var user2=await user1.save();
         
    }
    catch(err)
    {
        console.log(err);
    }
    // console.log(user2);
    
}

app.get("/user/setavt/:pname",(req,res)=>{
  setavatar(req,res);  
})

async function addemail(req,res)
{
    try{
        console.log(req.body);
        console.log(req.files);
        var user1=await user.findById(req.user.id);
        if(req.files.length>0)
        {
        var file1="/uploads/"+req.files[0].filename;
        
        user1.dp=file1;
        }
        user1.email=req.body.email;
        user1.about=req.body.about;
        
        var user2=await user1.save();
        // console.log(user2);
        
    }
    catch(err)
    {
        console.log(err);


    }
    res.redirect("/interests");
}


app.post("/user/addemail",upload.any(),(req,res)=>{

    addemail(req,res);
})

async function renderinterest(req,res)
{
    try{
var user1=await user.findById(req.user.id);
res.render("interests",{
    user:user1
})
    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/interests",(req,res)=>
{
 renderinterest(req,res);
})

async function rendercrtart(req,res)
{
    try{
     var user1=await user.findById(req.user.id);
     res.render("crtart",{
         user:user1
     })
    }
    catch(err)
    {
        console.log(err);
    }
}

async function interestfn(req,res)
{

    try{
var user1=await user.findById(req.user.id)
var opt=req.params.opt;
var name=req.params.name;
console.log(opt);
console.log(name);
if(opt=="add")
{
 user1.interests.push(name);
}
else if(opt=="remove")

{
user1.interests.forEach(function(int,index)
{
    if(int==name)
    {
        user1.interests.splice(index,1);
    }
})



}
res.send("ok");
var user2=user1.save();
    }
    catch(err)
    {

    }
}

app.get("/interest/:opt/:name",(req,res)=>{
    interestfn(req,res);
})

app.get("/create/article",(req,res)=>{

            rendercrtart(req,res);
        
    
})

async function createarticle(req,res)
{
    try{
        // console.log(req.body);

        // console.log(req.files.length);
        var date=Date().slice(4,15);
       var artbody=req.body.body.length;
       console.log(artbody);
       var minread=(Number(Math.floor(artbody/700))+1)
        if(req.files.length>0)
        {
        var file1="/uploads/"+req.files[0].filename;  
        var  file2="/uploads/"+req.files[0].filename;
    
        var name=  file2.split(".");
        var name2=name[0].split("/");

        var art= await article.create({
            title:req.body.title,
            body:req.body.body,
            createdUser:req.user.username,
            short:req.body.short,
            Date:date,
            readtime:minread
            

        });
        

         var obj={
             src:file1,
             name:name2[2]
         }
         art.img=obj;
        
        }
        else{

        var art= await article.create({
            title:req.body.title,
            body:req.body.body,
            createdUser:req.user.username,
            short:req.body.short,
            Date:date,
            readtime:minread

        });
        
        }
        var art2=await art.save();
        console.log(art2);
    }
    catch(err)
    {
        console.log(err);
    }
    try{
        var user1=await user.findById(req.user.id);
        // console.log(user1);
        user1.articles.push(art);
        var user2= await user1.save();

    



        // console.log(user2);
        res.redirect("/preview/"+art2.id);
    }

    catch(err)
    {
        console.log(err);
    }
}


app.post("/write/article",upload.any(),(req,res)=>{
createarticle(req,res);

});

async function previewarticle(req,res)
{
    try{

       var art2=await article.findById(req.params.aid);
       var user1=await user.findById(req.user.id)
    //    console.log(art2);
         res.render("preview",{
             art:art2,
             user:user1
         })

    }
    catch(err)
    {
        console.log(err);
        
    }
}

app.get("/preview/:aid",(req,res)=>{
    previewarticle(req,res);
})

async function editarticle(req,res)
{
    try{
      var art=await article.findById(req.params.aid);
      var user1=await user.findById(req.user.id);
      res.render("editart",{
          art:art,
          user:user1
      })
    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/edit/:aid",(req,res)=>{

    editarticle(req,res);
})

app.get("/article/:aid",(req,res)=>{
 
    article.findById(req.params.aid,function(err,art){
        if(err)
        {
         console.log(err);
        }
        else{
            // console.log(art);
            res.send({art:art});
        }

    })
})

async function savearticle(req,res)
{
    try{
     
        if(req.files.length>0)
        {
        var file1="/uploads/"+req.files[0].filename;  
        var  file2="/uploads/"+req.files[0].filename;
    
        var name=  file2.split(".");
        var name2=name[0].split("/");

        var art= await article.findById(req.params.aid)
            art.title=req.body.title;
            art.body=req.body.body;
            art.createdUser=req.user.username;

        
        

         var obj={
             src:file1,
             name:name2[2]
         }
         art.img=obj;
        
        }
        else{

        var art= await article.findById(req.params.aid);
            
          art.title=req.body.title;
          art.body=req.body.body;
          art.createdUser=req.user.username;
          art.short=req.body.short

        
        
        }

        var art2=await art.save();
     res.redirect("/preview/"+art2.id);   
    }
    catch(err)
    {
        console.log(err);
    }
}

app.post("/save/:aid",upload.any(),(req,res)=>{

    savearticle(req,res);
})

async function viewart(req,res)
{
    try{
       var art=await article.findById(req.params.aid);
       var user1=await user.findById(req.user.id);
       var author=art.createdUser;
       var auth=await user.findOne({username:author})
       res.render("view",{
           art:art,
           user:user1,
           author:auth
       })

    }
    catch(err)
    {

    }
}

app.get("/view/:aid",(req,res)=>{
   viewart(req,res);
})

async function addlikes(req,res)
{
    try{
        var art=await article.findById(req.params.aid);

        art.likes++;
        var art2=await art.save();
        // console.log(art2);
        var user1=await user.findById(req.user.id);
        var t=0;
         for(var i=0;i<user1.likedart.length;i++)
         {
             if(user1.likedart[i]==req.params.aid)
             {
                 t=1;
                 break;
             }
             
         }
         if(t==0)
         {

        user1.likedart.push(art2);
         }
        var user2=await user1.save();
        // console.log(user2);
    }
    catch(err)
    {
        console.log(err);
    }

}

app.get("/like/:aid",(req,res)=>{

   addlikes(req,res);
})
async function sublikes(req,res)
{
    try{
        var art=await article.findById(req.params.aid);

        art.likes--;
        var art2=await art.save();
        // console.log(art2);
        var user1=await user.findById(req.user.id);
        user1.likedart.forEach(function(likes,index)
        {
            if(likes==req.params.aid)
            {
                user1.likedart.splice(index,1);
            }
        })
        var user2=await user1.save();
    }
    catch(err)
    {
        console.log(err);
    }

}
app.get("/dislike/:aid",(req,res)=>{
    sublikes(req,res);
})

async function bookmarkfn(req,res)
{

 try{
     var user1=await user.findById(req.user.id);
     var art=await article.findById(req.params.aid);
     var opt=req.params.opt;
    //  console.log(opt);
     if(opt=="add")
     {
      user1.bookmarks.push(art);
    
    }
     else if(opt=="remove")
     {   
        //   console.log("working");
            user1.bookmarks.forEach(function(bart,index)
            {
                if(bart==req.params.aid)
                {
                    user1.bookmarks.splice(index,1);
                }
            })
     }
     var user2=await user1.save();

 }
 catch(err)
 {
     console.log(err);
 }
}

app.get("/bookmark/:opt/:aid",(req,res)=>{
    bookmarkfn(req,res);
})

async function addcommentfn(req,res)
{
    try{
       console.log(req.body);
        var art=await article.findById(req.params.aid);
        var user1=await user.findById(req.user.id);
        var obj={
            cmt:req.body.com,
            user:user1.username
        }
        art.comments.push(obj);
        var art1=art.save();
        res.send("ok");
    }
    catch(err)
    {
        console.log(err);
    }

}

app.post("/addcom/:aid",(req,res)=>{
    addcommentfn(req,res);
})

async function getcomfn(req,res)
{
    try{
      var art=await article.findById(req.params.aid);
      res.send({
          comments:art.comments
      })
    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/getcom/:aid",(req,res)=>{
    getcomfn(req,res);
})

async function getuser(req,res)
{
    try{
        var user1=await user.findById(req.user.id)
         res.send({
             username:user1.username,
             about:user1.about
         })
    
    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/getuser",(req,res)=>{
    getuser(req,res);
})



async function followfn(req,res)
{ console.log(req.params.uname);
    try{
        console.log("successfully followed");
        var loguser=await user.findById(req.user.id);
var user2=await user.findOne({username:req.params.uname});
var obj={
    user:user2.username
}
var obj2={
    user:loguser.username
}
loguser.following.push(obj);
user2.followers.push(obj2);
var loguser2=await loguser.save();
var user22=await user2.save();
res.send("success");
    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/follow/:uname",(req,res)=>{
    followfn(req,res);
})

async function unfollowfn(req,res)
{ console.log(req.params.uname);
    try{
        console.log("sucessfully unfollowed");
var loguser=await user.findById(req.user.id);
var user2=await user.findOne({username:req.params.uname});
loguser.following.forEach(function(f,index)
{
    if(f.user==user2.username)
    { 
        loguser.following.splice(index,1);

    }
})
user2.followers.forEach(function(f,index){
    if(f.user==loguser.username)
    {
        user2.followers.splice(index,1);
    }
})
var loguser2=await loguser.save();
var user22=await user2.save();
res.send("sucess");
    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/unfollow/:uname",(req,res)=>{
    unfollowfn(req,res);
})

async function renderprofile(req,res)
{
    try{
     var user1=await user.findById(req.user.id);
     res.render("profile",{
       user:user1         
     })
    }
    catch(err)
   {
       console.log(err);
   }
}


app.get("/profile",isloggedin,(req,res)=>{
renderprofile(req,res);
})

async function saveprofile(req,res)
{
    try{
        console.log(req.body);
        console.log(req.files);
        var user1=await user.findById(req.user.id)
        user1.username=req.body.username;
        user1.about=req.body.about;
        user1.email=req.body.email;
        var user2= await user1.save();


        res.send("success");
    }
    catch(err)
    {
        console.log(err);
    }
}
app.post("/profile/save",upload.any(),(req,res)=>{
 
saveprofile(req,res);
})


async function showuserliked(req,res)
{
    try{
    var user1=await user.findById(req.user.id).populate("likedart");
    // console.log(user1);
    res.send(user1);
    }
    catch(err)
    {
        console.log(err);
    }
}




app.get("/user/liked",(req,res)=>
{
    showuserliked(req,res);

})

async function showuserauth(req,res)
{
    try{
        var user1=await user.findById(req.user.id).populate("articles");
        //   console.log(user1);        
        res.send(user1);

    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/user/auth",(req,res)=>{

    showuserauth(req,res)
})

async function showuserbookmark(req,res)
{
    try{
       var user1=await user.findById(req.user.id).populate("bookmarks");
       res.send(user1);
    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/user/bookmark",(req,res)=>{

    showuserbookmark(req,res);
})

async function deletearticlefn(req,res)
{
    try{
     var art=await article.findByIdAndDelete(req.params.aid);
     var user1=await user.findById(req.user.id);
     user1.articles.forEach(function(art1,index)
     {
         if(art1.id==art.id)
         {
          user1.articles.slice(index,1);

         }

     })
     var user2=await user1.save();
     res.send("ok");

    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/delete/:aid",(req,res)=>{
    deletearticlefn(req,res);
})


async function showfol(req,res)
{
    try{
        var opt=req.params.opt;
var user1=await user.findById(req.user.id);
var result=[];

if(opt=="following")
{

    for(var i=0;i<user1.following.length;i++)
    {
        var user2=await user.findOne({username:user1.following[i].user})
        // console.log(user2);
                var obj={
                    username:user2.username,
                    dp:user2.dp,
                    id:user2.id
                }
                result.push(obj);
    }
    
    res.send({
        list:result,
        user:user1
    })

}
else if(opt="followers")
{
    for(var i=0;i<user1.followers.length;i++)
    {
    var user2=await user.findOne({username:user1.followers[i].user})
    // console.log(user2);
            var obj={
                username:user2.username,
                dp:user2.dp,
                id:user2.id
            }
            result.push(obj);
}
    res.send({
        list:result,
        user:user1
    })

}
    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/list/:opt",(req,res)=>
{
showfol(req,res);
})

async function exploreprofile(req,res)
{
    try{

        var userid=req.params.uid;
        var user1=await user.findById(userid).populate("articles");
        var user2=await user.findById(req.user.id);
        res.render("exploreprof",{
            user:user2,
            puser:user1
        })
    }
    catch(err)
    {
        console.log(err);
    }
}

app.get("/explore/profile/:uid",(req,res)=>{

exploreprofile(req,res);

})

////////////////////////////////////server route/////////////////////////////////////////

app.listen(port,()=>{
    console.log(`Article server running on port ${port}`);
})