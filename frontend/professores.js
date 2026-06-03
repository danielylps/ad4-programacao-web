let professores = [];

let currentProfessorId = null;

async function carregarProfessores() {
    try {

        const resposta = await fetch('http://localhost:3000/professores');

        professores = await resposta.json();

        renderProfessores();

    } catch (erro) {

        console.error('Erro ao carregar professores:', erro);

    }
}

function renderProfessores() {

    const tbody = document.querySelector('#professoresTable tbody');

    tbody.innerHTML = '';

    professores.forEach(prof => {

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${prof.nome}</td>
            <td>${prof.email}</td>
            <td>${prof.sala}</td>
            <td>
                <button onclick="editProfessor(${prof.id})">
                    Editar
                </button>

                <button onclick="deleteProfessor(${prof.id})">
                    Excluir
                </button>
            </td>
        `;

        tbody.appendChild(row);

    });
}

function openModal() {
    document.getElementById('professorModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('professorModal').style.display = 'none';
}

document.getElementById('addProfessor').addEventListener('click', () => {

    currentProfessorId = null;

    document.getElementById('professorForm').reset();

    openModal();

});

document.querySelector('.close').addEventListener('click', () => {

    closeModal();

});

function editProfessor(id) {

    const prof = professores.find(p => p.id === id);

    currentProfessorId = id;

    document.getElementById('nome').value = prof.nome;
    document.getElementById('email').value = prof.email;
    document.getElementById('sala').value = prof.sala;

    openModal();
}

function deleteProfessor(id) {

    professores = professores.filter(p => p.id !== id);

    renderProfessores();
}

document.getElementById('professorForm').addEventListener('submit', (e) => {

    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const sala = document.getElementById('sala').value;

    if (currentProfessorId === null) {

        professores.push({
            id: Date.now(),
            nome,
            email,
            sala
        });

    } else {

        const prof = professores.find(p => p.id === currentProfessorId);

        prof.nome = nome;
        prof.email = email;
        prof.sala = sala;
    }

    renderProfessores();

    closeModal();

});

carregarProfessores();