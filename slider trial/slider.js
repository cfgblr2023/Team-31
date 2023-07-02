const slider = document.querySelector('.slider');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

slider.addEventListener('mousedown', dragStart);
slider.addEventListener('touchstart', dragStart);
slider.addEventListener('mouseup', dragEnd);
slider.addEventListener('touchend', dragEnd);
slider.addEventListener('mousemove', drag);
slider.addEventListener('touchmove', drag);

function dragStart(event) {
  event.preventDefault();
  if (event.type === 'touchstart') {
    startPosition = event.touches[0].clientX;
  } else {
    startPosition = event.clientX;
    document.body.style.cursor = 'grabbing';
  }
  isDragging = true;
}

function drag(event) {
  if (isDragging) {
    const currentPosition = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    currentTranslate = prevTranslate + currentPosition - startPosition;
  }
}

function dragEnd() {
  prevTranslate = currentTranslate;
  isDragging = false;
  document.body.style.cursor = 'grab';
}

function updateSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

