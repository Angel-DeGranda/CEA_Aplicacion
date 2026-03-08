const nav_toogle = document.getElementById("nav-toggle");
const nav = document.querySelector('.main-nav');

const clientes = [
    { id: 1,  nombre: "Roberto Sánchez",      fecha: "2000-05-24", correo: "roberto@test.com",   telefono: "8121556430" },
    { id: 2,  nombre: "María López",           fecha: "1990-07-15", correo: "maria@test.com",     telefono: "8129874321" },
    { id: 3,  nombre: "Carlos Ramírez",        fecha: "1985-03-10", correo: "carlos@test.com",    telefono: "8124561234" },
    { id: 4,  nombre: "Ana Martínez",          fecha: "1995-11-28", correo: "ana@test.com",       telefono: "8123456789" },
    { id: 5,  nombre: "Jorge Hernández",       fecha: "1988-06-14", correo: "jorge@test.com",     telefono: "8125551234" },
    { id: 6,  nombre: "Laura García",          fecha: "1992-09-03", correo: "laura@test.com",     telefono: "8126667890" },
    { id: 7,  nombre: "Miguel Torres",         fecha: "1980-12-20", correo: "miguel@test.com",    telefono: "8127778901" },
    { id: 8,  nombre: "Sofía Morales",         fecha: "1997-04-08", correo: "sofia@test.com",     telefono: "8128889012" },
    { id: 9,  nombre: "Diego Flores",          fecha: "1983-08-17", correo: "diego@test.com",     telefono: "8129990123" },
    { id: 10, nombre: "Valentina Cruz",        fecha: "1998-02-25", correo: "vale@test.com",      telefono: "8121112233" },
    { id: 11, nombre: "Fernando Jiménez",      fecha: "1975-10-11", correo: "fernando@test.com",  telefono: "8122223344" },
    { id: 12, nombre: "Gabriela Reyes",        fecha: "1993-01-30", correo: "gaby@test.com",      telefono: "8123334455" },
    { id: 13, nombre: "Héctor Vargas",         fecha: "1987-07-22", correo: "hector@test.com",    telefono: "8124445566" },
    { id: 14, nombre: "Paola Castillo",        fecha: "1996-03-16", correo: "paola@test.com",     telefono: "8125556677" },
    { id: 15, nombre: "Ricardo Mendoza",       fecha: "1979-11-09", correo: "ricardo@test.com",   telefono: "8126667788" },
    { id: 16, nombre: "Claudia Ortega",        fecha: "1991-05-27", correo: "claudia@test.com",   telefono: "8127778899" },
    { id: 17, nombre: "Andrés Domínguez",      fecha: "1984-08-04", correo: "andres@test.com",    telefono: "8128889900" },
    { id: 18, nombre: "Natalia Ramos",         fecha: "1999-12-13", correo: "natalia@test.com",   telefono: "8129990011" },
    { id: 19, nombre: "Eduardo Guerrero",      fecha: "1977-04-19", correo: "eduardo@test.com",   telefono: "8121231234" },
];

const inputBuscar = document.getElementById('buscar-tutor');
const inputTutorId = document.getElementById('al-tutor-id');
const listaTutores = document.getElementById('lista-tutores');

if (inputBuscar) {
    inputBuscar.addEventListener('input', function () {
        const texto = this.value.toLowerCase().trim();
        listaTutores.innerHTML = '';
        inputTutorId.value = '';

        if (!texto) { listaTutores.hidden = true; return; }

        const filtrados = clientes.filter(c => c.nombre.toLowerCase().includes(texto));

        if (filtrados.length === 0) { listaTutores.hidden = true; return; }

        filtrados.forEach(c => {
            const li = document.createElement('li');
            li.textContent = c.nombre;
            li.addEventListener('click', () => {
                inputBuscar.value = c.nombre;
                inputTutorId.value = c.id;
                listaTutores.hidden = true;
            });
            listaTutores.appendChild(li);
        });

        listaTutores.hidden = false;
    });

    inputBuscar.addEventListener('blur', () => {
        const texto = inputBuscar.value.toLowerCase().trim();
        const exacto = clientes.find(c => c.nombre.toLowerCase() === texto);
        if (exacto) inputTutorId.value = exacto.id;
    });

    document.getElementById('form-alumno').addEventListener('submit', (e) => {
        if (!inputTutorId.value) {
            e.preventDefault();
            alert('Debes seleccionar un cliente de la lista');
            inputBuscar.focus();
        }
    });

    document.addEventListener('click', (e) => {
        if (!inputBuscar.contains(e.target)) listaTutores.hidden = true;
    });
}

nav_toogle.addEventListener('click', () => {
    nav.classList.toggle('abierto');
});

document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
        nav.classList.remove('abierto');
    }
});