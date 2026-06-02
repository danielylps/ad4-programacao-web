let cursos = [];

let editandoId = null;

async function carregarCursos() {
    try {
        const resposta = await fetch('http://localhost:3000/cursos');
        cursos = await resposta.json();

        renderCursos();
    } catch (erro) {
        console.error('Erro ao carregar cursos:', erro);
    }
}

function renderCursos() {
    const tbody = document.querySelector('#cursosTable tbody');

    tbody.innerHTML = '';

    cursos.forEach(curso => {

        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${curso.nome}</td>
            <td>${curso.sigla}</td>
            <td>${curso.coordenador}</td>
            <td>
                <button onclick="editarCurso(${curso.id})">
                    Editar
                </button>

                <button onclick="excluirCurso(${curso.id})">
                    Excluir
                </button>
            </td>
        `;

        tbody.appendChild(linha);
    });
}

function abrirModal() {
    document.getElementById('cursoModal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('cursoModal').style.display = 'none';
}

document.getElementById('addCurso').addEventListener('click', () => {

    editandoId = null;

    document.getElementById('cursoForm').reset();

    abrirModal();
});

document.querySelector('.close').addEventListener('click', () => {
    fecharModal();
});

function editarCurso(id) {

    const curso = cursos.find(c => c.id === id);

    editandoId = id;

    document.getElementById('nomeCurso').value = curso.nome;
    document.getElementById('sigla').value = curso.sigla;
    document.getElementById('coordenador').value = curso.coordenador;

    abrirModal();
}

function excluirCurso(id) {

    cursos = cursos.filter(c => c.id !== id);

    renderCursos();
}

document.getElementById('cursoForm').addEventListener('submit', (e) => {

    e.preventDefault();

    const nome = document.getElementById('nomeCurso').value;
    const sigla = document.getElementById('sigla').value;
    const coordenador = document.getElementById('coordenador').value;

    if (editandoId === null) {

        const novoCurso = {
            id: Date.now(),
            nome,
            sigla,
            coordenador
        };

        cursos.push(novoCurso);

    } else {

        const curso = cursos.find(c => c.id === editandoId);

        curso.nome = nome;
        curso.sigla = sigla;
        curso.coordenador = coordenador;
    }

    renderCursos();

    fecharModal();
});

carregarCursos();