var aid=document.querySelector("#aid").textContent;
var abody=document.querySelector("#abody");
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
{ var newline=/\n/g;
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
