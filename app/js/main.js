import detectDevice from './device.js';
import downloadData from './application-download.js';

const galleryContainer = document.querySelector('.gallery__container');
if (detectDevice()) {
  const carousel = document.getElementById('carousel').content.cloneNode(true);
  const indicators = carousel.querySelector('.carousel-indicators');
  const photos = carousel.querySelector('.carousel-inner');
  downloadData('./API/gallery.json').then(function(gallery) {
    gallery.forEach((element, index) => {
      const li = document.createElement('li');
      li.dataset.target = '#carouselExampleIndicators';
      li.dataset.slideTo = index;

      let div = document.createElement('div');
      div.classList.add('carousel-item');

      if (index == 0) {
        li.className = 'active';
        div.classList.add('active');
      }
      indicators.appendChild(li);

      const img = document.createElement('img');
      img.classList.add('d-block');
      img.classList.add('gallery__img');
      img.src = element.img;
      img.alt = element.title;
      div.appendChild(img);
      photos.appendChild(div);
    });
    galleryContainer.appendChild(carousel);
    $('.carousel').bcSwipe({ threshold: 50 });
  });
} else {
  downloadData('./API/gallery.json').then(function(gallery) {
    gallery.forEach(element => {
      const img = document.createElement('img');
      img.classList.add('gallery__block-img');
      img.src = element.img;
      img.alt = element.title;
      galleryContainer.appendChild(img);
    });
  });
}
