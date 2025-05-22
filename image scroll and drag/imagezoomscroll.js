// 20 images as requested, in order
const imageUrls = [
  'plussign low quality-02.jpg',
  'plussign low quality-03.jpg',
  'plussign low quality-04.jpg',
  'plussign low quality-06.jpg',
  'plussign low quality-07.jpg',
  'plussign low quality-08.jpg',
  'plussign low quality-09.jpg',
  'plussign low quality-10.jpg',
  'plussign low quality-11.jpg',
  'plussign low quality-12.jpg',
  'plussign low quality-13.jpg',
  'plussign low quality-31.jpg',
  'plussign low quality-32.jpg',
  'plussign low quality-34.jpg',
  'plussign low quality-35.jpg',
  'plussign low quality-36.jpg',
  'plussign low quality-37.jpg',
  'plussign low quality-38.jpg',
  'plussign low quality-39.jpg',
  'plussign low quality-41.jpg'
];

// Sparse grid pattern based on your image (modify as needed)
const filledCells = [
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 0, 0],
  [1, 1, 0, 1, 1, 0, 1, 0],
  [1, 1, 1, 0, 1, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0], // pad with zeros to make 8 columns
];
// Ensure all rows have exactly 8 columns
for (let i = 0; i < filledCells.length; i++) {
  while (filledCells[i].length < 8) filledCells[i].push(0);
}

// Insert text into a specific cell in the grid (e.g., last cell)
// You can change row/col to place the text elsewhere
const textRow = 3, textCol = 5; // last cell in the grid
const gridCells = [];

let imgIndex = 0;
const grid = document.getElementById('gallery');
for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 8; col++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    // Place text in the chosen cell
    if (row === textRow && col === textCol) {
      const textDiv = document.createElement('div');
      textDiv.className = 'grid-text';
      textDiv.innerHTML = '05.2024 <br> +SIGN, Groningen NL.';
      cell.appendChild(textDiv);
    } else if (filledCells[row][col] && imgIndex < imageUrls.length) {
      const img = document.createElement('img');
      img.src = imageUrls[imgIndex];
      img.className = 'grid-img';
      img.draggable = false;
      img.tabIndex = -1;
      img.addEventListener('mousedown', e => e.preventDefault());
      img.addEventListener('click', e => e.preventDefault());
      cell.appendChild(img);
      imgIndex++;
    }
    grid.appendChild(cell);
    gridCells.push(cell);
  }
}

// Remove any transition for instant update
const gallery = document.getElementById('gallery');
gallery.style.transition = 'none'; // Remove transition

// Prevent image selection/drag interference
gallery.addEventListener('mousedown', e => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
    return false;
  }
});

// --- Zoom & Pan Script ---
const container = document.getElementById('container');

// Gallery state
let scale = 1; // initial zoom: images shown at normal size
const minScale = 0.1, maxScale = 2.5;
let offsetX = 0, offsetY = 0;
let isDragging = false, dragStart = {x: 0, y: 0}, lastOffset = {x: offsetX, y: offsetY};

// Set initial transform
function updateTransform() {
  gallery.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}
updateTransform();

// Mouse wheel for zoom (smooth, slow, and relative to cursor)
container.addEventListener('wheel', (e) => {
  if (e.ctrlKey || e.metaKey) return;
  e.preventDefault();
  const rect = container.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const zoomIntensity = 0.012; // even slower and smoother
  let oldScale = scale;
  let newScale = scale;
  if (e.deltaY < 0) newScale = Math.min(maxScale, scale + zoomIntensity);
  else newScale = Math.max(minScale, scale - zoomIntensity);
  if (newScale !== oldScale) {
    // Calculate the position in the grid before scaling
    const gx = (mouseX - offsetX) / oldScale;
    const gy = (mouseY - offsetY) / oldScale;
    scale = newScale;
    // Adjust offset so the point under the mouse stays under the mouse
    offsetX = mouseX - gx * scale;
    offsetY = mouseY - gy * scale;
    updateTransform();
  }
}, { passive: false });

// Drag to pan (no effect, just instant)
container.addEventListener('mousedown', e => {
  isDragging = true;
  dragStart.x = e.clientX;
  dragStart.y = e.clientY;
  lastOffset.x = offsetX;
  lastOffset.y = offsetY;
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.clientX - dragStart.x;
  const dy = e.clientY - dragStart.y;
  offsetX = lastOffset.x + dx;
  offsetY = lastOffset.y + dy;
  updateTransform();
});

window.addEventListener('mouseup', e => {
  isDragging = false;
});

window.addEventListener('resize', () => {
  updateTransform();
});
