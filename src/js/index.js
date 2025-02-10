import '../scss/main.scss';
import "@splidejs/splide/dist/css/splide.min.css";
import Lenis from 'lenis'

const lenis = new Lenis()

lenis.on('scroll', (e) => {})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor?.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    lenis.scrollTo(targetId);
  });
});