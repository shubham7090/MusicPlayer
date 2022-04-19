window.addEventListener('load',function(){
    
})
console.log("Welcome to Music Player");


// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]
// let songs;
// fetch("http://localhost:3000/songs",{method:"GET",mode:"no-cors"}).then(response=>response.json()).then(data=>{songs=data})

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// ########################### MODAL ############################
let timeoutVal=2;//minutes
let userFeedback={
    name:"",
    email:"",
    like:"",
    val:"",
    content:""
};
window.onload=setTimeout(openFeedback,timeoutVal*60*1000);
let modal=document.querySelector('.feedback');
let feedbackBtn=document.querySelector('#feedback-btn');
let closeBtn=document.querySelectorAll("#closeBtn");
console.log(closeBtn);
let feedbackNext=document.getElementById('feedbackNext');
let feedbackSubmity=document.getElementById('feedbackSubmity');
let feedbackSubmitn=document.getElementById('feedbackSubmitn');
let feedbackSubmitm=document.getElementById('feedbackSubmitm');
feedbackBtn.addEventListener('click',openFeedback);
closeBtn.forEach(element => {
    element.addEventListener('click',closeFeedBack);
}); 
function openFeedback(){
    modal.style.display='block';
    document.getElementById('feedback1').style.display='block';
}
function closeFeedBack(){
    modal.style.display='none';
    document.getElementById('feedback1').style.display='none';
    document.getElementById('feedback2').style.display='none';
    document.getElementById('feedback3').style.display='none';
    document.getElementById('feedback4').style.display='none';
    
}
window.addEventListener('click',function(e){
    if(e.target==modal){closeFeedBack();}
});
feedbackNext.addEventListener('click',function(){
    let val=document.getElementsByName('how');
    val.forEach(function(i){
        if(i.checked)loadFeedbackPage(i.value);
    })
    
})
function loadFeedbackPage(page){
    if(page==2){ // loved
        document.getElementById('feedback1').style.display="none";
        document.getElementById('feedback2').style.display='block';
        document.getElementById('feedback3').style.display="none";
        document.getElementById('feedback4').style.display='none';
        
        
    }else if(page==3){
        document.getElementById('feedback1').style.display="none";
        document.getElementById('feedback2').style.display="none";
        document.getElementById('feedback3').style.display='block';
        document.getElementById('feedback4').style.display='none';
    }
    else if(page ==4){ // not sure
        document.getElementById('feedback1').style.display="none";
        document.getElementById('feedback3').style.display="none";
        document.getElementById('feedback2').style.display="none";
        document.getElementById('feedback4').style.display='block';
    }
}

feedbackSubmity.addEventListener("click",function(){
    console.log("Yes button hit");
    userFeedback.like="yes";
    let val=document.getElementsByName('whylove');
    val.forEach(function(i){
        if(i.checked){
            switch(i.value){
                case '1':
                    userFeedback.val+="Music Quality, ";
                    break;
                case '2':
                    userFeedback.val+="Music Variety, ";
                    break;
                case '3':
                    userFeedback.val+="User Interface, ";
                    break;
                case '4':
                    userFeedback.val+="Accessibility, ";
                    break;
                case '5':
                    userFeedback.val+="Speed, ";
                    break;            
            }
        }
    })
    loadFeedbackPage(4)
});
feedbackSubmitn.addEventListener("click",function(){
    console.log("No button hit");
    userFeedback.like="no";
    userFeedback.like="yes";
    let val=document.getElementsByName('whyhate');
    val.forEach(function(i){
        if(i.checked){
            switch(i.value){
                case '1':
                    userFeedback.val+="Music Quality, ";
                    break;
                case '2':
                    userFeedback.val+="Music Variety, ";
                    break;
                case '3':
                    userFeedback.val+="User Interface, ";
                    break;
                case '4':
                    userFeedback.val+="Accessibility, ";
                    break;
                case '5':
                    userFeedback.val+="Speed, ";
                    break;            
            }
        }
    })
    loadFeedbackPage(4)
});
feedbackSubmitm.addEventListener("click",function(){

    closeFeedBack();
    console.log(document.getElementsByName("name"));
    userFeedback.name=document.getElementsByName("name")[0].value;
    userFeedback.email=document.getElementsByName("email")[0].value;
    userFeedback.content=document.getElementsByName("content")[0].value;
    console.log(userFeedback);
    fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify(userFeedback),
    }).then(function(){
        console.log("request sent");
    }).catch(function(err){
        console.log("Error in request");
        console.log(err);
    });

});