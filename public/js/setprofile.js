

function setavt(e)
{
     console.log(`button ${e.name} clicked`);
    fetch(`/user/setavt/${e.name}`,{

    })
    .then((res)=>{

    })
    
    .catch((err)=>{
        console.log(err);
    })
}
