// CONFIGURACIÓN DE SUPABASE
const SUPABASE_URL = 'https://psrxlxcjjhelzflwelqz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_V0lqUNnmLo4XpuNKPV3fNA_vTZ1kw6V';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// SE EJECUTA AL CARGAR CUALQUIER PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema cargado en:", window.location.pathname);
    
    // 1. Inicializar Selects (si existen en la página)
    actualizarSelects();

    // 2. Cargar tabla de reportes (si existe el elemento)
    if (document.getElementById('tabla-body')) {
        cargarTablaFinal();
    }
});

// --- LÓGICA PARA ALUMNOS (alumnos.html) ---
const formAl = document.getElementById('form-alumno');
if (formAl) {
    formAl.addEventListener('submit', async (e) => {
        e.preventDefault();
        const { error } = await _supabase.from('alumnos').insert([{
            nombre: document.getElementById('al-nombre').value,
            email: document.getElementById('al-email').value,
            fecha_nacimiento: document.getElementById('al-fecha').value
        }]);
        
        if (error) alert("Error: " + error.message);
        else {
            alert("Alumno registrado con éxito");
            formAl.reset();
            actualizarSelects(); // Refresca el dropdown de inscripción en la misma página
        }
    });
}

// --- LÓGICA PARA MAESTROS (maestros.html) ---
const formMa = document.getElementById('form-maestro');
if (formMa) {
    formMa.addEventListener('submit', async (e) => {
        e.preventDefault();
        const { error } = await _supabase.from('maestros').insert([{
            nombre: document.getElementById('ma-nombre').value,
            email: document.getElementById('ma-email').value,
            especialidad: document.getElementById('ma-especialidad').value
        }]);
        
        if (error) alert("Error: " + error.message);
        else {
            alert("Maestro registrado con éxito");
            formMa.reset();
        }
    });
}

// --- LÓGICA PARA CLASES (clases.html) ---
const formCu = document.getElementById('form-curso');
if (formCu) {
    formCu.addEventListener('submit', async (e) => {
        e.preventDefault();
        const { error } = await _supabase.from('cursos').insert([{
            nombre_curso: document.getElementById('cu-nombre').value,
            horario: document.getElementById('cu-horario').value,
            maestro_id: document.getElementById('select-maestro-asignado').value
        }]);
        
        if (error) alert("Error: " + error.message);
        else {
            alert("Clase creada correctamente");
            formCu.reset();
        }
    });
}

// --- LÓGICA PARA INSCRIPCIONES (alumnos.html) ---
const formIns = document.getElementById('form-inscripcion');
if (formIns) {
    formIns.addEventListener('submit', async (e) => {
        e.preventDefault();
        const { error } = await _supabase.from('inscripciones').insert([{
            alumno_id: document.getElementById('sel-ins-alumno').value,
            curso_id: document.getElementById('sel-ins-curso').value
        }]);
        
        if (error) alert("Error: " + error.message);
        else {
            alert("¡Inscripción completada!");
            formIns.reset();
        }
    });
}

// --- BUSCADOR (reportes.html) ---
const buscador = document.getElementById('buscador');
if (buscador) {
    buscador.addEventListener('input', (e) => {
        cargarTablaFinal(e.target.value);
    });
}

// --- FUNCIONES DE CARGA DE DATOS ---

async function actualizarSelects() {
    // Select de Maestros (en clases.html)
    const selM = document.getElementById('select-maestro-asignado');
    if (selM) {
        const { data } = await _supabase.from('maestros').select('id, nombre');
        if (data) {
            selM.innerHTML = '<option value="">Seleccionar Maestro</option>' + 
                data.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('');
        }
    }

    // Selects de Inscripción (en alumnos.html)
    const selA = document.getElementById('sel-ins-alumno');
    const selC = document.getElementById('sel-ins-curso');
    if (selA && selC) {
        const { data: alumnos } = await _supabase.from('alumnos').select('id, nombre');
        const { data: cursos } = await _supabase.from('cursos').select('id, nombre_curso, horario');
        
        if (alumnos) {
            selA.innerHTML = '<option value="">Selecciona Alumno</option>' + 
                alumnos.map(a => `<option value="${a.id}">${a.nombre}</option>`).join('');
        }
        if (cursos) {
            selC.innerHTML = '<option value="">Selecciona Curso</option>' + 
                cursos.map(c => `<option value="${c.id}">${c.nombre_curso} (${c.horario})</option>`).join('');
        }
    }
}

async function cargarTablaFinal(filtro = '') {
    const { data, error } = await _supabase
        .from('inscripciones')
        .select(`
            fecha_inscripcion,
            alumnos(nombre, email),
            cursos(nombre_curso, horario, maestros(nombre))
        `);

    if (error) return console.error("Error cargando reporte:", error);

    const tabla = document.getElementById('tabla-body');
    if (!tabla) return;
    
    tabla.innerHTML = '';

    const filtrados = data.filter(i => 
        i.alumnos.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
        i.cursos.nombre_curso.toLowerCase().includes(filtro.toLowerCase())
    );

    filtrados.forEach(i => {
        const fecha = new Date(i.fecha_inscripcion).toLocaleDateString();
        tabla.innerHTML += `
            <tr>
                <td><strong>${i.alumnos.nombre}</strong><br><small>${i.alumnos.email}</small></td>
                <td>${i.cursos.nombre_curso}<br><small>${i.cursos.horario}</small></td>
                <td>${i.cursos.maestros ? i.cursos.maestros.nombre : 'Sin maestro'}</td>
                <td>${fecha}</td>
            </tr>
        `;
    });
}