const togglebtn=document.getElementsByClassName("toggle-btn");
togglebtn[0].addEventListener("click",function(){
    document.getElementById("login").style.display="block";
    togglebtn[0].classList.add("btn-active");
    document.getElementById("register").style.display="none";
    togglebtn[1].classList.remove("btn-active");

})
togglebtn[1].addEventListener("click",function(){
    document.getElementById("login").style.display="none";
    togglebtn[0].classList.remove("btn-active");
    document.getElementById("register").style.display="block";
    togglebtn[1].classList.add("btn-active");
})

function displayLoginForm(){
    document.querySelector(".form-container").style.display="block";
    togglebtn[0].click();
}

document.getElementById("registerbtn").addEventListener("click",async function(e){
    e.preventDefault();
    let user={
        name:"",
        number:"",
        email:"",
        password:"",
        accessCount:0,
    };
    document.querySelectorAll("#register input").forEach(function(ele,i){
        user[Object.keys(user)[i]]=ele.value;
    });
    const result=await(await fetch("http://localhost:3100/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify(user),
    })).json();
    console.log(result);
    if(result.status=="error"){
        alert(result.error);
    }else{
        alert(result.data);
    }

})



document.getElementById("loginbtn").addEventListener("click",async function(e){
    e.preventDefault();
    let user={
        email:"",
        password:"",
    };
    document.querySelectorAll("#login input").forEach(function(ele,i){
        user[Object.keys(user)[i]]=ele.value;
    });
    const result=await(await fetch("http://localhost:3100/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify(user),
    })).json();
    console.log(result);
    if(result.status=="error"){
        alert(result.error);
    }else if(result.status=="admin"){
        alert(result.data);
        window.location.assign("admin.html");
    }
    else{
        window.location.assign("player.html");
        console.log(result.data);
        document.cookie=`login=${result.data}`;
    }
})

// document.querySelector("#login input[type=password]").addEventListener("focus",async function(){
//     console.log("Event Fired");
//     let user=document.querySelector("#login input[type=text]").value;
//     if(user!==""){
//         const result=await(await fetch("http://localhost:3100/rememberLogin", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 'Accept': 'application/json',
//             },
//         body: JSON.stringify({
//                 'username':user,
//                 'token':document.cookie,
//             }),
//         })).json();
//         console.log(result);
//         if(result.status=="ok"){
//             alert(result.data);
//             window.location.assign("player.html");
//         }
//     }
// })