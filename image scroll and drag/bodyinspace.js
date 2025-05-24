const imageUrls = [
  // If your images are in a subfolder (e.g., "images"), prefix the filenames:
  // 'images/plussign low quality-02.jpg',
  'plussign low quality -02.jpg',
  'plussign low quality -03.jpg',
  'plussign low quality -04.jpg',
  'plussign low quality -06.jpg',
  'plussign low quality -07.jpg',
  'plussign low quality -08.jpg',
  'plussign low quality -09.jpg',
  'plussign low quality -10.jpg',
  'plussign low quality -11.jpg',
  'plussign low quality -12.jpg',
  'plussign low quality -13.jpg',
  'plussign low quality -31.jpg',
  'plussign low quality -32.jpg',
  'plussign low quality -34.jpg',
  'plussign low quality -35.jpg',
  'plussign low quality -36.jpg',
  'plussign low quality -37.jpg',
  'plussign low quality -38.jpg',
  'plussign low quality -39.jpg',
  'plussign low quality -01.jpg',
  'plussign low quality -05.jpg',
  'plussign low quality -14.jpg',
  'plussign low quality -15.jpg',
  'plussign low quality -16.jpg',
  'plussign low quality -17.jpg',
  'plussign low quality -18.jpg',
  'plussign low quality -19.jpg',
  'plussign low quality -20.jpg',
  'plussign low quality -21.jpg',
  'plussign low quality -22.jpg',
  'plussign low quality -23.jpg',
  'plussign low quality -24.jpg',
  'plussign low quality -25.jpg',
  'plussign low quality -26.jpg',
  'plussign low quality -27.jpg',
  'plussign low quality -28.jpg',
  'plussign low quality -29.jpg',
  'plussign low quality -30.jpg',
  'plussign low quality -33.jpg',
  
];

// Shuffle images array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffleArray(imageUrls);

// Render images in the column
const imageColumn = document.getElementById('image-column');
imageUrls.forEach((url, idx) => {
  const img = document.createElement('img');
  img.src = url;
  img.alt = `Image ${idx+1}`;
  img.dataset.idx = idx;
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    showFullscreen(idx);
  });
  imageColumn.appendChild(img);
});

// Fullscreen overlay logic
const overlay = document.getElementById('fullscreen-overlay');
const fullscreenImg = document.getElementById('fullscreen-img');
const fullscreenContent = document.getElementById('fullscreen-content');
let currentIdx = null;

function showFullscreen(idx) {
  currentIdx = idx;
  // Remove previous gallery images
  fullscreenContent.innerHTML = '';
  // Create gallery images
  imageUrls.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Image ${i+1}`;
    img.className = 'fullscreen-gallery-img';
    img.style.boxShadow = 'none';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      // Optionally: close overlay if clicking again on the same image
      // closeFullscreen();
    });
    fullscreenContent.appendChild(img);
  });
  overlay.classList.remove('hidden');
  // Scroll to the selected image vertically
  setTimeout(() => {
    const galleryImgs = fullscreenContent.getElementsByClassName('fullscreen-gallery-img');
    if (galleryImgs[idx]) {
      galleryImgs[idx].scrollIntoView({behavior: 'auto', block: 'center', inline: 'nearest'});
    }
  }, 0);
}

function closeFullscreen() {
  overlay.classList.add('hidden');
  fullscreenContent.innerHTML = '';
  currentIdx = null;
}

// Close overlay when clicking outside the images
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeFullscreen();
});

// Prevent overlay close when clicking on content
fullscreenContent.addEventListener('click', (e) => {
  e.stopPropagation();
});

// ESC key closes overlay
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
    closeFullscreen();
  }
});