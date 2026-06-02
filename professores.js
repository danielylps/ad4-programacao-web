//array dos professores
let professores = [
    { nome: 'João Silva', email: 'joao@ifc.edu.br', sala: 'A101' },
    { nome: 'Maria Souza', email: 'maria@ifc.edu.br', sala: 'B202' }
];

//variavel para o id atual
let currentProfessorId = null;

//renderizar tabela
function renderProfessores() {
    const tbody = document.querySelector('#professoresTable tbody');
    tbody.innerHTML = '';

    professores.forEach((prof, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${prof.nome}</td>
            <td>${prof.email}</td>
            <td>${prof.sala}</td>
            <td>
                <button onclick="editProfessor(${index})">Editar</button>
                <button onclick="deleteProfessor(${index})">Excluir</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

//modal
function openModal() {
    document.getElementById('professorModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('professorModal').style.display = 'none';
}

//botão adicionar
document.getElementById('addProfessor').addEventListener('click', function() {
    currentProfessorId = null;
    document.getElementById('professorForm').reset();
    openModal();
});

//fechar modal
document.querySelector('.close').addEventListener('click', closeModal);

//editar
function editProfessor(index) {
    const prof = professores[index];

    document.getElementById('nome').value = prof.nome;
    document.getElementById('email').value = prof.email;
    document.getElementById('sala').value = prof.sala;

    currentProfessorId = index;

    openModal();
}

//excluir
function deleteProfessor(index) {
    if (confirm('Deseja excluir?')) {
        professores.splice(index, 1);
        renderProfessores();
    }
}

//adicionar
function addProfessor(nome, email, sala) {
    professores.push({ nome, email, sala });
}

//submit do formulário
document.getElementById('professorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const sala = document.getElementById('sala').value;

    if (currentProfessorId === null) {
        addProfessor(nome, email, sala);
    } else {
        professores[currentProfessorId] = { nome, email, sala };
    }

    closeModal();
    renderProfessores();
});

//inicial
renderProfessores();