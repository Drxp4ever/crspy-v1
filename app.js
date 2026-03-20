// Initial profile values
let username = "User";
let bio = "";
let glassesMode = "Study Mode";
let leftBattery = 100;
let rightBattery = 100;
let btDevice = "Not connected";

// Update profile function
function updateProfile() {
    const nameInput = document.getElementById("username-input").value;
    const bioInput = document.getElementById("bio-input").value;
    if(nameInput) username = nameInput;
    if(bioInput) bio = bioInput;
    document.getElementById("username-display").textContent = username;
    alert("Profile updated!");
}

// Toggle glasses mode
function toggleMode() {
    const modes = ["Study Mode", "Learning Mode", "Gaming Mode", "Translation Mode"];
    let currentIndex = modes.indexOf(glassesMode);
    glassesMode = modes[(currentIndex + 1) % modes.length];
    document.getElementById("glasses-mode").textContent = glassesMode;
}

// Simulate battery drain (for demo)
setInterval(() => {
    leftBattery = Math.max(0, leftBattery - 0.1);
    rightBattery = Math.max(0, rightBattery - 0.1);
    document.getElementById("left-batt").textContent = leftBattery.toFixed(0) + "%";
    document.getElementById("right-batt").textContent = rightBattery.toFixed(0) + "%";
}, 3000);

// Simulate Bluetooth connection
function connectBluetooth(deviceName) {
    btDevice = deviceName;
    document.getElementById("bt-device").textContent = btDevice;
}

// App slot click demo
document.querySelectorAll(".app-slot").forEach(slot => {
    slot.addEventListener("click", () => {
        alert(`Opening ${slot.dataset.app} in CRSPY...`);
    });
});
