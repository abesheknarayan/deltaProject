
var dropbtn=document.querySelector("#dropdownMenuButton");
var dploc=document.querySelector("#dploc").textContent;
dropbtn.style.backgroundImage=`url(${dploc})`;

async function addfn(e)
{
    // console.log(e.id);
    var interest=e.id.slice(1);
    console.log(interest);

    if(e.classList[2]=="fa-plus-circle")
    {
        e.classList.remove("fa-plus-circle");
        e.classList.add("fa-check-circle");

        let res=await fetch(`/interest/add/${interest}`)
        .then(function(res)
        {

        })
        .catch(function(err)
        {
            console.log(err);
        })
    }
    else if(e.classList[2]=="fa-check-circle")
    {
        e.classList.remove("fa-check-circle");

        e.classList.add("fa-plus-circle");

        let res=await fetch(`/interest/remove/${interest}`)
        .then(function(res)
        {

        })
        .catch(function(err)
        {
            console.log(err);
        })
       
    }
}