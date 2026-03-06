const nav_toogle = document.getElementById("nav-toggle");

nav_toogle.addEventListener('click', () => {
    document.querySelector('.main-nav').classList.toggle('abierto');
});