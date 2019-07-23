

var aid=document.querySelector("#aid").textContent;
var abody=document.querySelector("#abody");

var comments=document.querySelector("#comments");
var allcom=[];
console.log(aid);
var dropbtn=document.querySelector("#dropdownMenuButton");
var dploc=document.querySelector("#dploc").textContent;
dropbtn.style.backgroundImage=`url(${dploc})`;





fetch(`/article/${aid}`)
.then(function(res)
{
    return res.json();
})
.then(function(data){
 
    
    console.log(data.art)
   displaynew(data.art.body);
    

})
.catch(function(err)
{
    console.log(err);
})


function displaynew(body)

{
    console.log(body);
    var newline=/\n/g;
    var bold=/\_(\w+)\_/g;
    var italic=/\__(\w+)\__/g;
    var bolditalic=/\___(\w+)\___/g;
    var link =/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
    var hpperlink=/^_h_(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
var res= body.split(/\n/);
var output="";
res.forEach(function(p)
{ i=0;
  
    var words=p.split(" ");
    var p2="";
    // console.log(words);
    words.forEach(function(word){
        var w=word;
        if(bold.test(word))
        {
            // console.log(word)
        var a=word.match(bold);
        // console.log(a);
        var w=`<b>${a[0].split("_")[1]}</b>`
        //  console.log(w);
        }
        if(italic.test(word))
        {
            var w=`<i>${word.split("__")[1]}</i>`
        }
        if(bolditalic.test(word))
        {
            var w=`<b><i>${word.split("___")[1]}</i></b>`
        }  
           
         
        if(link.test(word))
         { console.log("helooo");
            var a=word.match(link);
            console.log(a);

            var w=`<a href="${a}">${a}</a>`
          console.log(w);


        }
        if(hpperlink.test(word))
        {
            console.log("hyperlink detected");
            var w=`<a href="${word.split("_h_")[1]}">${word.split("_h_")[2]}</a>`
        }


    p2+=`${w} `;
        
    })
  
   output+=`
   <p> ${p2}</p>
   `

abody.innerHTML=output;
})
}

function viewres(e)
{
    var state=e.textContent;
    console.log(state);
    document.querySelector("#responses").style.display="block";
    if(state=="View comments")
    {
       e.textContent="Hide comments"
    }
    else{
        e.textContent="View comments";
        document.querySelector("#responses").style.display="none";
        
    }
}




function addcom(e)
{
var aid=e.id;
var com=document.querySelector("#cmtinp").value;
console.log(com);



console.log(aid);

fetch("/getuser")
.then(function(res)
{
    return res.json();
})
.then(function(data){
      console.log(data.username);
      var username=data.username;
      
      var obj={
          cmt:com,
          user:username
      }
      allcom.push(obj);
      discom();
})
.catch(function(err)
{
    console.log(err);
})

fetch(`/addcom/${aid}`,{
    method:"POST",
    body:JSON.stringify({
        com:com
    })
})
.then(function(res)
{

})
.catch(function(err)
{
    console.log(err);
})

document.querySelector("#cmtinp").value='';

}

discom();

function discom()
{
    console.log(aid);
    fetch(`/getcom/${aid}`)
    .then(function(res)
    {
        return res.json();
    })
    .then(function(data)
    { var comopt='';
       console.log(data.comments);
       data.comments.forEach(function(com)
       {
           comopt+=`
           <div class="addedcom">
           <p><b>${com.user}</b></p>
           <p>${com.cmt}</p>
           </div>
         
           `
           comments.innerHTML=comopt;
       })
       

    })
    .catch(function(err)
    {
        console.log(err);
    })
}


async function followfn(e)
{
    var username1=e.id;
    // console.log(username1);
    // console.log(e.classList);


    if(e.classList[2]=="fyes")
    {
      e.textContent="follow";
      e.classList.remove("fyes"); 
      
      e.classList.remove("btn-success");
      e.classList.add("btn-outline-success"); 
      e.classList.add("fno");

      
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

}


async function likedfn(e)
{
console.log(e.id);
    if(e.classList[2]=="unliked")
    {
        e.classList.remove("unliked");   
    e.classList.remove("fa-heart-o");
    e.classList.add("fa-heart");
    
    e.classList.add("liked");

     var val=Number(e.nextSibling.textContent);
    //  e.nextSibling.textContent="";
     console.log(val);
     val++;
     e.nextSibling.textContent=Number(val);


 let res= await fetch(`/like/${e.id}`)
    .then(function(res)
    {
        return res.json();
    })
    .then(function(data){
         
    })
    .catch(function(err)
    {
        console.log(err);
    })
    
    
   }
   else if(e.classList[2]=="liked")
   {
    e.classList.remove("liked");  
   e.classList.remove("fa-heart");
   e.classList.add("fa-heart-o");
  
   e.classList.add("unliked");
   var val=Number(e.nextSibling.textContent);
   //  e.nextSibling.textContent="";
    console.log(val);
    val--;
    e.nextSibling.textContent=Number(val);

   

   let res=await fetch(`/dislike/${e.id}`)
    .then(function(res)
    {
        return res.json();
    })
    .then(function(data){
         
    })
    .catch(function(err)
    {
        console.log(err);
    })
    
   
  }


}


async function bookart(e)

{
    var aid=e.id;
    console.log(e.classList[1]);

    if(e.classList[1]=="fa-bookmark-o")
    {
         e.classList.remove("fa-bookmark-o");
         e.classList.add("fa-bookmark");
        let res=await fetch(`/bookmark/add/${aid}`)
         .then(function(res){
             
         })
         .catch(function(err)
         {
             console.error(err);
         })
    }
    else if(e.classList[1]=="fa-bookmark"){
        e.classList.add("fa-bookmark-o");
        e.classList.remove("fa-bookmark");
      let res=await   fetch(`/bookmark/remove/${aid}`)
        .then(function(res){
            
        })
        .catch(function(err)
        {
            console.error(err);
        })


    }

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