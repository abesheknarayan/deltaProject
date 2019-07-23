var ob;

var dropbtn=document.querySelector("#dropdownMenuButton");
var dploc=document.querySelector("#dploc").textContent;
dropbtn.style.backgroundImage=`url(${dploc})`;
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

async function likedfn(e)
{
console.log(e.id);
    if(e.classList[2]=="unliked")
    {
      
    e.classList.remove("fa-heart-o");
    e.classList.add("fa-heart");
    e.classList.remove("unliked");
    e.classList.add("liked");

     var val=Number(e.nextSibling.textContent);
    //  e.nextSibling.textContent="";
     console.log(val);
     val++;
     e.nextSibling.textContent=Number(val);


 let res=await fetch(`/like/${e.id}`)
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
    
   e.classList.remove("fa-heart");
   e.classList.add("fa-heart-o");
   e.classList.remove("liked");
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
       let res=await fetch(`/bookmark/remove/${aid}`)
        .then(function(res){
            
        })
        .catch(function(err)
        {
            console.error(err);
        })


    }

}