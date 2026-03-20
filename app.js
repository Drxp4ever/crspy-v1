// ===== Translation Setup =====
const translations = {
  en: {
    title: "CRSPY AR Glasses",
    subtitle: "Experience Augmented Reality",
    description: "Try out our AR glasses simulation with fully interactive features and multiple languages.",
    startDemo: "Start Demo",
    stopDemo: "Stop Demo",
    toggleMode: "Dark Mode"
  },
  pl: {
    title: "Okulary AR CRSPY",
    subtitle: "Doświadcz Rzeczywistości Rozszerzonej",
    description: "Wypróbuj symulację naszych okularów AR z pełną interakcją i wieloma językami.",
    startDemo: "Rozpocznij Demo",
    stopDemo: "Zatrzymaj Demo",
    toggleMode: "Tryb Ciemny"
  }
};

i18next.init({ lng: 'en', resources: { en: { translation: translations.en }, pl: { translation: translations.pl } } }, updateTexts);

function updateTexts() {
  document.getElementById('title').innerText = i18next.t('title');
  document.getElementById('subtitle').innerText = i18next.t('subtitle');
  document.getElementById('description').innerText = i18next.t('description');
  document.getElementById('startDemo').innerText = i18next.t('startDemo');
  document.getElementById('stopDemo').innerText = i18next.t('stopDemo');
  document.getElementById('toggleMode').innerText = i18next.t('toggleMode');
}

// Language Switcher
document.getElementById('lang-en').addEventListener('click', () => i18next.changeLanguage('en', updateTexts));
document.getElementById('lang-pl').addEventListener('click', () => i18next.changeLanguage('pl', updateTexts));

// ===== Dark Mode Toggle =====
document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// ===== AR Canvas Simulation =====
let scene, camera, renderer, cube, animationId;

function initAR() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 800/450, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('arCanvas'), antialias: true });
  renderer.setSize(800, 450);

  // Cube to simulate AR overlay
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x0071e3 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;
}

function animateAR() {
  animationId = requestAnimationFrame(animateAR);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Button Controls
document.getElementById('startDemo').addEventListener('click', () => {
  if (!scene) initAR();
  animateAR();
});

document.getElementById('stopDemo').addEventListener('click', () => {
  cancelAnimationFrame(animationId);
});
