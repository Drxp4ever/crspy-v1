// PROFILE
function saveProfile(){
  const name = document.getElementById("nameInput").value;
  localStorage.setItem("name", name);
  document.getElementById("nameDisplay").innerText = name;
}

window.onload = ()=>{
  const saved = localStorage.getItem("name");
  if(saved){
    document.getElementById("nameDisplay").innerText = saved;
  }
};

// MODE SYSTEM
let modes = ["Study","Learning","Gaming","Translation"];
let current = 0;

function switchMode(){
  current = (current + 1) % modes.length;
  document.getElementById("mode").innerText = modes[current];
  document.getElementById("viewMode").innerText = modes[current];
  notify("Mode switched to " + modes[current]);
}

// BATTERY SYSTEM
let left = 100;
let right = 100;
let glass = 100;

setInterval(()=>{
  left -= 0.1;
  right -= 0.1;
  glass -= 0.05;

  document.getElementById("leftBatt").innerText = Math.floor(left)+"%";
  document.getElementById("rightBatt").innerText = Math.floor(right)+"%";
  document.getElementById("glassBatt").innerText = Math.floor(glass)+"%";

  if(left < 20) notify("Left bracelet low battery");
  if(right < 20) notify("Right bracelet low battery");
},3000);

// NOTIFICATIONS
function notify(msg){
  const div = document.createElement("div");
  div.className = "notification";
  div.innerText = msg;
  document.getElementById("notifications").appendChild(div);
}

// APPS
let activeApps = [];

function openApp(name){
  activeApps.push(name);
  document.getElementById("viewApps").innerText = activeApps.join(", ");
}

// TRANSLATION
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

// TECH WALL DRAG
let wall = document.getElementById("wall");

document.querySelectorAll(".app").forEach(app=>{
  app.addEventListener("dragstart", e=>{
    e.dataTransfer.setData("text", e.target.innerText);
  });
});

wall.addEventListener("dragover", e=>{
  e.preventDefault();
});

wall.addEventListener("drop", e=>{
  e.preventDefault();
  let name = e.dataTransfer.getData("text");

  let div = document.createElement("div");
  div.className = "wallItem";
  div.innerText = name;

  div.style.left = e.offsetX + "px";
  div.style.top = e.offsetY + "px";

  makeDraggable(div);

  wall.appendChild(div);
  saveWall();
});

// DRAG MOVE
function makeDraggable(el){
  let offsetX, offsetY;

  el.onmousedown = (e)=>{
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    document.onmousemove = (e)=>{
      el.style.left = (e.pageX - wall.offsetLeft - offsetX) + "px";
      el.style.top = (e.pageY - wall.offsetTop - offsetY) + "px";
    };

    document.onmouseup = ()=>{
      document.onmousemove = null;
      saveWall();
    };
  };
}

// SAVE WALL
function saveWall(){
  let items = [];
  document.querySelectorAll(".wallItem").forEach(el=>{
    items.push({
      name: el.innerText,
      x: el.style.left,
      y: el.style.top
    });
  });

  localStorage.setItem("wall", JSON.stringify(items));
}

// LOAD WALL
window.onload = ()=>{
  let data = JSON.parse(localStorage.getItem("wall") || "[]");

  data.forEach(item=>{
    let div = document.createElement("div");
    div.className = "wallItem";
    div.innerText = item.name;
    div.style.left = item.x;
    div.style.top = item.y;
    makeDraggable(div);
    wall.appendChild(div);
  });
};
