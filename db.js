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
    };
    document.querySelectorAll("#register input").forEach(function(ele,i){
        user[Object.keys(user)[i]]=ele.value;
    });
    const result=await fetch("http://localhost:3100/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(function(){
        console.log("request sent");
    }).catch(function(err){
        console.log("Error in request");
        console.log(err);
    });
    console.log(result);
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
    const result=await fetch("http://localhost:3100/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(function(){
        console.log("request sent");
    }).catch(function(err){
        console.log("Error in request");
        console.log(err);
    });
    console.log(result);
})