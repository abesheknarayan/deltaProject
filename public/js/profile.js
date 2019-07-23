var savechanges=document.querySelector("#savechanges");
var dropbtn=document.querySelector("#dropdownMenuButton");
var bookmarks=document.querySelector("#bookmarks");
var liked=document.querySelector("#liked");
var userart=document.querySelector("#userart");
var userdetails=document.querySelector("#userdetails");
var span1=document.querySelector("#span1");
var span2=document.querySelector("#span2");
var span3=document.querySelector("#span3");
var span4=document.querySelector("#span4");
var followerslist=document.querySelector("#followerslist");
var followinglist=document.querySelector("#followinglist");
var maindet=document.querySelector("#maindet");


followerslist.style.display="none";
followinglist.style.display="none";

var reloadstatus=true;
  bookmarks.style.display="none";
  liked.style.display="none";
  userart.style.display="none";
 span1.classList.add("selected");

var dploc=document.querySelector("#dploc").textContent;
dropbtn.style.backgroundImage=`url(${dploc})`;


async function showfollowers()
{
  var followersopt='';
  maindet.style.display="none";
  followinglist.style.display="none";
  followerslist.style.display="";

   followersopt+=`
   <h3>Followers</h3>
   ` 
   let res=await fetch("/list/followers")
   .then(function(res)
   {
   return res.json();

   })
   .then(function(data)
   {
     console.log(data);

     data.list.forEach(function(fuser)
     {
        followersopt+=`
        
        <div  class="otherprof"  >
        <div id="${fuser.id}" onclick="showprof(this)" >
        <img src="${fuser.dp}" class="othersdp" alt="dp" >
        <span>${fuser.username}</span>
        </div>
         `;
        var t=0;
        data.user.following.forEach(function(fo)
        {
          if(fo.user==fuser.username)
          {
            t=1;
          }

        })
        if(t==0)
        {
           followersopt+=`
           <div>
           <button style="float: right" class="btn btn-outline-success fno"  id="${fuser.username}" onclick="followfn(this)">Follow</button>           
           </div>
           </div>
           `
        }
        else{
            followersopt+=`
            <div>
            <button style="float: right" class="btn btn-success fyes"  id="${fuser.username}" onclick="followfn(this)">Following</button>
            </div>
            </div>
            `
        }
        followerslist.innerHTML=followersopt;
     })
     

   })
   .catch(function(err)
   {
     console.log(err);
   }) 

  
}
async function showfollowing()
{
  var followingopt="";
  maindet.style.display="none";
  followinglist.style.display="";
  followerslist.style.display="none";
followingopt+=`
<h3>Following</h3>
`
let res=await fetch("/list/following")
  .then(function(res)
  {
return res.json()
  })
  .then(function(data)
  {
    console.log(data);
   
    data.list.forEach(function(fuser)
    {
       followingopt+=`

       <div  class="otherprof" >
       <div id="${fuser.id}" onclick="showprof(this)"> 
       <img src="${fuser.dp}" class="othersdp" alt="dp" >
       <span>${fuser.username}</span>
       </div>
      
       `;
       var t=0;
       data.user.following.forEach(function(fo)
       {
         if(fo.user==fuser.username)
         {
           t=1;
         }

       })
       if(t==0)
       {
          followingopt+=`
          <div>
          <button style="float: right" class="btn btn-outline-success fno" id="${fuser.username}" onclick="followfn(this)">Follow</button>           
          </div>
          </div>
          `;
       }
       else{
           followingopt+=`
           <div>
           <button style="float: right" class="btn btn-success fyes" id="${fuser.username}" onclick="followfn(this)">Following</button>
           </div>
           </div>

           `;
       }
       followinglist.innerHTML=followingopt;  
    })
     
  
    

  })
  .catch(function(err)
  {
    console.log(err);
  })

followinglist.innerHTML=followingopt;
}



async function savefn()
{
  window.addEventListener("beforeunload",function(e){
    if(reloadstatus)
    {
      e.returnValue="hi"; 
    }
     reloadstatus=false
  })


var output='';
output+=`
<button onclick="saveprofile()" class="btn btn-success" id="savebtn">Save changes</button>
`
savechanges.innerHTML=output;
} 

async function saveprofile()
{ 
  window.addEventListener("beforeunload",function(e){
       
   })
  


     var username=document.querySelector("#username").value;
     var about=document.querySelector("#about").value;
     var email=document.querySelector("#email").value;
      savechanges.textContent="";
  

    // console.log("function triggered");
    // console.log(dp);
    
   let res=await fetch(`/profile/save`,{
       method:'POST',
    

       body:JSON.stringify({
        username:username,
        about:about,
        email:email,
        
       })
   })
   .then(function(res)
   {
      console.log(res.text());
   })
   .catch(function(err)
   {
       console.log(err);
   })
   



}




async function likedfn()
{
  userdetails.style.display='none';
  bookmarks.style.display="none";
  userart.style.display="none";
  liked.style.display="";

  span1.classList.remove("selected");
  span1.classList.add("unselected");
  span2.classList.remove("selected");    
  span3.classList.remove("selected");    
  span4.classList.remove("unselected");  
  span2.classList.add("unselected");    
  span3.classList.add("unselected");    
  span4.classList.add("selected");  



  var likedopt="";
  
  likedopt+=`
  
  `
 let res=await fetch("/user/liked")
   .then(function(res)
   {
       return res.json();
   })
   .then(function(data)
   {
    //   console.log(data.likedart[0]._id);
     if(data.likedart.length>0)
     {
      data.likedart.forEach(function(art)
      { var aid=art._id;
        // console.log(aid);
          if(art.img!=undefined)
          likedopt+=`
          <div >
          <div class="card art">
           <div class="detdiv">
             <div id="${aid}" onclick="viewfn(this)">
           <h4>${art.title}</h4>
           <p>By ${art.createdUser}</p>
           <p>${art.short}</p>
           <span class="artdate">${art.Date}</span>
           <span class="artdate">${art.readtime} min read</span>

           
          </div>
             </div>
             <div class="artimgdiv" >
             <img class="artimg"  src="${art.img.src}"   alt="article image">
            </div>
        
         </div>
          
        </div>
          `
          else if(art.img==undefined)
          {
            likedopt+=`
            <div >
            <div class="card art">
             <div class="detdiv">
               <div id="${aid}"  onclick="viewfn(this)">
             <h4>${art.title}</h4>
             <p>By ${art.createdUser}</p>
             <p>${art.short}</p>
             <span class="artdate">${art.Date}</span>
             <span class="artdate">${art.readtime} min read</span>
            </div>
               </div>
               <div class="artimgdiv" >
               <img class="artimg"  src="/images/login.jpeg"   alt="article image">
              </div>
          
           </div>
            
          </div>
            `

          }
          liked.innerHTML=likedopt;
      })
    }
    else{
      likedopt+=`
      <div class="nodatamsg">
      <h3>No articles is added to liked list yet!</h3>
      <form action="/home">
      <button class="btn btn-info">Read some!</button>
      </form>
      </div>
      `
      liked.innerHTML=likedopt;
    }

   })
   .catch(function(err)
   {
       console.log(err);
   })




  
}
async function userdetfn()
{
    userdetails.style.display='';
   
    bookmarks.style.display="none";
    userart.style.display="none";
    liked.style.display="none";
    maindet.style.display="";
    followerslist.style.display="none";
    followinglist.style.display="none";
 span1.classList.remove("unselected");
   span1.classList.add("selected");
   span2.classList.remove("selected");    
   span3.classList.remove("selected");    
   span4.classList.remove("selected");  
   span2.classList.add("unselected");    
   span3.classList.add("unselected");    
   span4.classList.add("unselected");  





    }

async function bookfn()
{
    userdetails.style.display='none';
    bookmarks.style.display="";
    userart.style.display="none";
    liked.style.display="none";

    span1.classList.remove("selected");  

    span2.classList.remove("selected");    
    span3.classList.remove("unselected");    
    span4.classList.remove("selected");  
   
    span3.classList.add("selected");    
    span4.classList.add("unselected");
    span1.classList.add("unselected"); 
    span2.classList.add("unselected");  

    var bookopt="";

    bookopt+=`

    `
  let res=await  fetch("/user/bookmark")
    .then(function(res)
    {
        return res.json();

    })
    .then(function(data){
        // console.log(data.bookmarks);
       if(data.bookmarks.length>0)
       {
        data.bookmarks.forEach(function(art)
        {
            var aid=art._id;
            // console.log(aid);
              if(art.img!=undefined)
              bookopt+=`
              <div id="book${aid}">
              <div class="card art">
               <div class="detdiv">
                 <div id="${aid}" onclick="viewfn(this)">
               <h4>${art.title}</h4>
               <p>By ${art.createdUser}</p>
               <p>${art.short}</p>
               </div>
               <span class="artdate">${art.Date}</span>
               <span class="artdate">${art.readtime} min read</span>
             
               <div class="dropdown artdrop">
               <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                 
               
               <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            
   <button class="dropdown-item" id="rb${aid}" onclick="rmbook(this)">Remove Bookmark</button>  
   
    
  
              
             </div>
              </div>
                 </div>
                 <div class="artimgdiv" >
                 <img class="artimg"  src="${art.img.src}"   alt="article image">
                </div>
            
             </div>
              
            </div>
              `
              else if(art.img==undefined)
              {
                bookopt+=`
                <div id="book${aid}">
                <div class="card art">
                 <div class="detdiv">
                   <div id="${aid}"  onclick="viewfn(this)">
                 <h4>${art.title}</h4>
                 <p>By ${art.createdUser}</p>
                 <p>${art.short}</p>
                 </div>
                 <span class="artdate">${art.Date}</span>
                 <span class="artdate">${art.readtime} min read</span>
                 <div class="dropdown artdrop">
                 <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                   
               
                 <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              
     <button class="dropdown-item" id="rb${aid}" onclick="rmbook(this)">Remove Bookmark</button>  
     
      
    
                
               </div>
                </div>
              
                   </div>
                   <div class="artimgdiv" >
                   <img class="artimg"  src="/images/login.jpeg"   alt="article image">
                  </div>
              
               </div>
                
              </div>
                `
    
              }
              bookmarks.innerHTML=bookopt;


        })
      }
      else{
        bookopt+=`
        <div class="nodatamsg">
        <h3>No articles added to Bookmarks yet!</h3>
        <form action="/home">
        <button class="btn btn-info">Read some!</button>
        </form>
        </div>
        `
        bookmarks.innerHTML=bookopt;
      }
      })


 

}

async function authfn()
{
    userdetails.style.display='none';
    bookmarks.style.display="none";
    userart.style.display="";

    liked.style.display="none";
    span1.classList.remove("selected");  

    span2.classList.remove("unselected");    
    span3.classList.remove("selected");    
    span4.classList.remove("selected");  
   
    span3.classList.add("unselected");    
    span4.classList.add("unselected");
    span1.classList.add("unselected"); 
    span2.classList.add("selected");  


   var authopt="";

   authopt+=`
   
   ` 

  let res=await fetch("/user/auth")
   .then(function(res){
       return res.json();
   })
   .then(function(data){
    //   console.log(data.articles);
           if(data.articles.length>0)
           {
      data.articles.forEach(function(art){

        var aid=art._id;
        // console.log(aid);
          if(art.img!=undefined)
          authopt+=`
          <div id="aid${aid}">
          <div class="card art">
           <div class="detdiv">
             <div id="${aid}" onclick="viewfn(this)">
           <h4>${art.title}</h4>
           <p>By ${art.createdUser}</p>
           <p>${art.short}</p>
           </div>
           <span class="artdate">${art.Date}</span>
           <span class="artdate">${art.readtime} min read</span>
          
                
          
          <div class="dropdown artdrop">
          <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
          
          
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
         
          <a class="dropdown-item" href="/edit/${aid}">Edit Article</a>  
        
           
           <button class="dropdown-item" id="${aid}" onclick="deleteart(this)" >Delete Article</button> 
          
          
          </div>
        </div>
             </div>
             <div class="artimgdiv" >
             <img class="artimg"  src="${art.img.src}"   alt="article image">
            </div>
        
         </div>
          
        </div>
          `
          else if(art.img==undefined)
          {
            authopt+=`
            <div id="aid${aid}">
            <div class="card art">
             <div class="detdiv">
               <div id="${aid}"  onclick="viewfn(this)">
             <h4>${art.title}</h4>
             <p>By ${art.createdUser}</p>
             <p>${art.short}</p>
             </div>
             <span class="artdate">${art.Date}</span>
             <span class="artdate">${art.readtime} min read</span>
 
            
            <div class="dropdown artdrop">
            <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
         
<a class="dropdown-item" href="/edit/${aid}">Edit Article</a>  

 
<a class="dropdown-item"  href="/delete/${aid}" >Delete Article</a> 
            </div>
          </div>
          </div>
               <div class="artimgdiv" >
               <img class="artimg"  src="/images/login.jpeg"   alt="article image">
              </div>
              
           </div>
            
          </div>
            `

          }
          userart.innerHTML=authopt;
      })
    }
    else{
     authopt+=`
     <div class="nodatamsg">
     <h3>You havent written any articles yet!</h3>
     <form action="/create/article">
     <button class="btn btn-info">Write some!</button>
     </form>
     </div>
     `
     userart.innerHTML=authopt;
    }
   })
   .catch(function(err)
   {
       console.log(err);
   })
   


}
function viewfn(e)
{
    var aid=e.id;
    ob=e;
    console.log(e);
fetch(`/view/${aid}`)
.then(function(res)
{
 window.location.assign(`/view/${aid}`);   
})
.catch(function(err)
{
console.log(err);
})
}

async function deleteart(e)
{
  console.log(e.id);
  var aid=e.id;
  var todeletediv=document.querySelector(`#aid${aid}`);
  todeletediv.remove();
  console.log(todeletediv);
  let res=await fetch(`/delete/${aid}`)
  .then(function(res)
  {
   console.log("deleted");
   authfn();
  })
  .catch(function(err)
  {
    console.log(err);
  })
}

async function rmbook(e)
{
console.log(e.id);
var aid=e.id.slice(2);
console.log(aid);

var todeletediv=document.querySelector(`#book${aid}`);
todeletediv.remove();

let res=await fetch(`/bookmark/remove/${aid}`)
.then(function(res)
{
console.log("done");
})
.catch(function(err)

{
  console.log(err);
})

}


async function showprof(e)
{
  var userid=e.id;
  console.log(userid);

  let res=await fetch(`/explore/profile/${userid}`)
  .then(function(res)
  {
    window.location.assign(`/explore/profile/${userid}`)
  })
  .catch(function(err)
  {
    console.log(err);
  })
}
async function followfn(e)
{
    var username1=e.id;
    console.log(username1);
    // console.log(e.classList);
  var fcount=Number(document.querySelector("#nofollowing").textContent);
 
    if(e.classList[2]=="fyes")
    {
      e.textContent="follow";
      e.classList.remove("fyes"); 
      
      e.classList.remove("btn-success");
      e.classList.add("btn-outline-success"); 
      e.classList.add("fno");
      fcount--; 
          
     let res=await fetch(`/unfollow/${username1}`)
      .then(function(res)
      {
        console.log("unfollowed");  
      })
      .catch(function(err)
      {
          console.log(err);
      })
    }  
     else if(e.classList[2]=="fno")
     {
         e.textContent="following";

      e.classList.remove("fno"); 
      fcount++;
      e.classList.remove("btn-outline-success");
      e.classList.add("btn-success");  
      e.classList.add("fyes");
          
    let res=await fetch(`/follow/${username1}`)
    .then(function(res)
    {
       
    })
    .catch(function(err)
    {
        console.log(err);
    })
     }
     document.querySelector("#nofollowing").textContent=fcount;

}