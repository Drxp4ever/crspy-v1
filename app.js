// PROFILE SAVE
function saveProfile() {
  const name = document.getElementById("nameInput").value;
  localStorage.setItem("name", name);
  document.getElementById("nameDisplay").innerText = name;
}

// LOAD PROFILE
window.onload = () => {
  const saved = localStorage.getItem("name");
  if(saved){
    document.getElementById("nameDisplay").innerText = saved;
  }
}

// MODE SYSTEM
let modes = ["Study","Learning","Gaming","Translation"];
let current = 0;

function switchMode(){
  current = (current + 1) % modes.length;
  document.getElementById("mode").innerText = modes[current];
  document.getElementById("viewMode").innerText = modes[current];
}

// BATTERY SIM
let left = 100;
let right = 100;

setInterval(()=>{
  left -= 0.2;
  right -= 0.2;

  document.getElementById("leftBatt").innerText = Math.floor(left)+"%";
  document.getElementById("rightBatt").innerText = Math.floor(right)+"%";
},3000);

// APPS
let activeApps = [];

function openApp(name){
  activeApps.push(name);
  document.getElementById("viewApps").innerText = activeApps.join(", ");
}

// TRANSLATION SIM
function startTranslation(){
  const phrases = [
    "Hello → Cześć",
    "How are you → Jak się masz",
    "Good morning → Dzień dobry",
    "Thank you → Dziękuję"
  ];

  setInterval(()=>{
    let rand = phrases[Math.floor(Math.random()*phrases.length)];
    document.getElementById("translationBox").innerText = rand;
  },600);
}

// DRAG APPS (TECH WALL)
document.querySelectorAll(".app").forEach(app=>{
  app.addEventListener("dragstart", e=>{
    e.dataTransfer.setData("text", e.target.innerText);
  });
});

document.getElementById("wall").addEventListener("dragover", e=>{
  e.preventDefault();
});
