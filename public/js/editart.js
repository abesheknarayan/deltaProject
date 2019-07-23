var dropbtn=document.querySelector("#dropdownMenuButton");
var dploc=document.querySelector("#dploc").textContent;
dropbtn.style.backgroundImage=`url(${dploc})`;
var short=document.querySelector("#short");
expandfn(short);
async function expandfn(e)
{
      console.log("function triggered");
      console.log(e.scrollTop);
    if(e.scrollTop != 0){
        e.style.height = e.scrollHeight + "px";
    }       
}


var cedit=document.querySelector("#contentedit");

async function savefn(e)
{console.log("triggered");
    console.log(cedit.innerHTML);
}


