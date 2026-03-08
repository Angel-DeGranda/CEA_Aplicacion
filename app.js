const nav_toogle = document.getElementById("nav-toggle");
const nav = document.querySelector('.main-nav');

nav_toogle.addEventListener('click', () => {
    nav.classList.toggle('abierto');
});

document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
        nav.classList.remove('abierto');
    }
});