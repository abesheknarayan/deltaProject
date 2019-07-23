
var dropbtn=document.querySelector("#dropdownMenuButton");
var dploc=document.querySelector("#dploc").textContent;
// console.log(dploc)
dropbtn.style.backgroundImage=`url(${dploc})`;

getart();
async function getart(){

    var pid=document.querySelector("#puserid").textContent;
console.log(pid);


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

async function followfn(e)
{
    var username1=e.id;
    // console.log(username1);
    // console.log(e.classList);
    var no=Number(document.querySelector("#folno").textContent);
      

    if(e.classList[2]=="fyes")
    {
      e.textContent="follow";
      e.classList.remove("fyes"); 
      
      e.classList.remove("btn-success");
      e.classList.add("btn-outline-success"); 
      e.classList.add("fno");
    no--;
       
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
          
      no++;
    let res=await fetch(`/follow/${username1}`)
    .then(function(res)
    {
       
    })
    .catch(function(err)
    {
        console.log(err);
    })
     }

     document.querySelector("#folno").textContent=no;
    }
