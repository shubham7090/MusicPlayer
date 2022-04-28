// document.querySelector(".adminBtn").addEventListener("click",function(e){
//     e.preventDefault();
//     let email=document.getElementsByName('email')[0].value;
//     let password=document.getElementsByName('password')[0].value;
//     console.log(email+" "+password);
//     if(password=='1234'){
//         document.querySelector(".adminFormContainer").style.display="none";
//         displaycards();
//     }
// })
displaycards();
function displaycards(){
    let cardConatiner=document.querySelector(".cardContainer");
    cardConatiner.style.display="block";
    let data;
    fetch("http://localhost:3100/feedback")
    .then(data => {
        return data.json();
    })
    .then(post => {
        data=post;
        console.log(post);
        data.forEach(element => {
            let card=document.createElement('div');
            card.classList.add("card");
            card.innerHTML=`<h4>Name : </h4> <p>${element.name}</p><br>
            <h4>Email : </h4> <p>${element.email}</p><br>
            <h4>Access Count : </h4> <p>${element.access}</p><br>
            <h4>Did You liked the player? : </h4> <p>${element.like}</p><br>
            <h4>What Did you Like? : </h4> <p>${element.val}</p><br>
            <h4>Feedback : </h4> <br>
            <p>${element.content}</p>`;
            cardConatiner.appendChild(card);
        });
    });
    

}