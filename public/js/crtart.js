

var dropbtn=document.querySelector("#dropdownMenuButton");
var dploc=document.querySelector("#dploc").textContent;
dropbtn.style.backgroundImage=`url(${dploc})`;
var status=true;


async function checkfn(e)
{  
    // autosize(this);
    console.log("function triiger");
    window.addEventListener("beforeunload",function(e)
    {
        if(status)
        {
        e.returnValue="hi";
        }
        status=false;

    })
   
    if(e.scrollTop != 0){
        e.style.height = e.scrollHeight + "px";
    }        

    // console.log(e.scrollTop);
}

async function addtagfn()
{
    fetch("/addtag/")
}


async function createfn()
{
window.addEventListener("beforeunload",function(e)
{

})
}
